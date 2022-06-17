import CountryInfo from "./CountryInfo";
import ShowCountry from "./ShowCountry";

const ListCountry = ({ query, countries }) => {
	// Convierte a minuscula los nombres de los paises
	const filteredQuery = countries.filter(country =>
		country.name.common.toLowerCase().startsWith(query.toLowerCase())
	);

	const viewCountries =
		filteredQuery.length === 1 
			? <CountryInfo filteredQuery={filteredQuery} />
			: <ShowCountry filteredQuery={filteredQuery} />;

	const viewMessage =
		filteredQuery.length > 10 
			?	<p>Too many macthes, specify another filter</p>
			: viewCountries;

	return !query ? <p></p> : viewMessage;
};

export default ListCountry;