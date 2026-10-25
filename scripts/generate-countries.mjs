import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import countries from "world-countries";

const populationUrl =
	"https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=400&mrnev=1";
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 15000);

let populationByCountry;
try {
	const response = await fetch(populationUrl, { signal: controller.signal });
	if (!response.ok) {
		throw new Error(`World Bank API returned HTTP ${response.status}.`);
	}

	const payload = await response.json();
	if (!Array.isArray(payload?.[1])) {
		throw new Error("World Bank API returned an unexpected response.");
	}

	populationByCountry = new Map(
		payload[1]
			.filter(
				({ country, value }) =>
					/^[A-Z]{2}$/.test(country?.id ?? "") && Number.isSafeInteger(value),
			)
			.map(({ country, value, date }) => [
				country.id,
				{
					population: value,
					populationYear: Number(date),
				},
			]),
	);
} catch (error) {
	const reason =
		error.name === "AbortError" ? "request timed out" : error.message;
	throw new Error(
		`Could not load population data from the World Bank: ${reason}`,
	);
} finally {
	clearTimeout(timeout);
}

const matchedCountries = countries.filter(({ cca2 }) =>
	populationByCountry.has(cca2),
).length;
if (matchedCountries < countries.length * 0.6) {
	throw new Error(
		`World Bank population data matched only ${matchedCountries} of ${countries.length} catalog entries.`,
	);
}

const data = countries.map((country) => {
	const population = populationByCountry.get(country.cca2);
	return {
		name: country.name,
		flags: {
			png: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
		},
		maps: {
			googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name.common)}`,
		},
		capital: country.capital ?? [],
		area: country.area,
		population: population?.population ?? null,
		populationYear: population?.populationYear ?? null,
		region: country.region,
		subregion: country.subregion,
		languages: country.languages ?? {},
	};
});

const outputPath = fileURLToPath(
	new URL("../src/data/countries.generated.json", import.meta.url),
);
await writeFile(outputPath, `${JSON.stringify(data)}\n`);
