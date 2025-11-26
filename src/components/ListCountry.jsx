import CountryInfo from "./CountryInfo";
import ShowCountry from "./ShowCountry";

const ListCountry = ({ query, countries }) => {
	// Convierte a minuscula los nombres de los paises
	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().startsWith(query.toLowerCase())
	);

	const viewCountries =
		filteredCountries.length === 1 ? (
			<CountryInfo countries={filteredCountries} />
		) : (
			<ShowCountry countries={filteredCountries} />
		);

	const viewMessage =
		filteredCountries.length > 10 ? (
			<p>Too many macthes, specify another filter</p>
		) : (
			viewCountries
		);

	return !query ? <></> : viewMessage;
};

export default ListCountry;