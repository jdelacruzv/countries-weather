import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import countries from "world-countries";

const populationUrl =
	"https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=400&mrnev=1";

const cachePath = fileURLToPath(
	new URL("../src/data/population.cache.json", import.meta.url),
);

let payload;
try {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 15000);

	const response = await fetch(populationUrl, { signal: controller.signal });
	clearTimeout(timeout);

	if (!response.ok) {
		throw new Error(`World Bank API returned HTTP ${response.status}.`);
	}

	payload = await response.json();
	if (!Array.isArray(payload?.[1])) {
		throw new Error("World Bank API returned an unexpected response.");
	}

	await writeFile(cachePath, JSON.stringify(payload)).catch(() => {});
} catch (error) {
	console.warn(
		`[Aviso Local] No se pudo conectar al Banco Mundial: ${error.message}. Intentando usar caché local...`,
	);
	try {
		const cachedData = await readFile(cachePath, "utf8");
		payload = JSON.parse(cachedData);
	} catch (cacheError) {
		console.warn(
			"[Aviso Local] No hay caché disponible. Usando datos sin población para poder desarrollar.",
		);
		payload = [null, []]; // Evita que explote si no hay red ni caché
	}
}

const populationByCountry = new Map(
	(payload?.[1] ?? [])
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

const matchedCountries = countries.filter(({ cca2 }) =>
	populationByCountry.has(cca2),
).length;

// Si estamos en local y no hay matches, permitimos continuar en lugar de romper el npm run dev
if (matchedCountries < countries.length * 0.6) {
	console.warn(
		`[Aviso] World Bank population data matched only ${matchedCountries} of ${countries.length} catalog entries. Continuando de todos modos en entorno de desarrollo...`,
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
