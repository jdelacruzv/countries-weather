import Weather from "./Weather";

const CountryInfo = ({ filteredQuery }) => {
	return filteredQuery.map((country) => (
		<div key={country.name.common}>
			<h1>{country.name.common}</h1>
			{/* <h2>{country.name.official}</h2> */}
			<img src={country.flags.png} width="150" alt={country.name.common} />
			<div>Capital: {country.capital}</div>
			<div>Area: {country.area}</div>
			<div>Population: {country.population}</div>
			<div>Region: {country.region}</div>
			<div>Subregion: {country.subregion}</div>
			<h3>languages: </h3>
			<ul>
				{Object.values(country.languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<Weather capitalName={country.capital} />
		</div>
	));
};

export default CountryInfo;
