import CountryInfo from "./CountryInfo";
import ShowCountry from "./ShowCountry";

const ListCountry = ({ query, countries }) => {
	// Convierte a minuscula los nombres de los paises
	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().startsWith(query.toLowerCase()),
	);

	const viewCountries =
		filteredCountries.length === 1 ? (
			<CountryInfo countries={filteredCountries} />
		) : (
			<ShowCountry countries={filteredCountries} />
		);

	const viewMessage =
		filteredCountries.length > 10 ? (
			<p>Too many matches, specify another filter</p>
		) : filteredCountries.length === 0 ? (
			<p role="status">No countries match "{query}".</p>
		) : (
			viewCountries
		);

	return !query ? <></> : viewMessage;
};

export default ListCountry;
