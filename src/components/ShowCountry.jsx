import { useState } from "react";
import CountryInfo from "./CountryInfo";
import style from "./ShowCountry.module.css";

const ShowCountry = ({ countries }) => {
	const [info, setInfo] = useState(false);
	const [filter, setFilter] = useState(true);
	const [cty, setCty] = useState({});

	const handleShowInfo = (cty) => {
		setInfo(!info);
		setFilter(!filter);
		setCty(cty);
	};

	const filteredCountries = countries.map((country) => (
		<div className={style.row} key={country.name.common}>
			<p className={style.row__text}>{country.name.common}</p>
			<button className={style.row__btn} onClick={() => handleShowInfo(country)}>
				show
			</button>
		</div>
	));

	const countryData = countries.length === 1 ? countries[0] : [cty];

	return (
		<>
			<div className={style.list}>{filter && filteredCountries}</div>
			{info && <CountryInfo countries={countryData} />}
		</>
	);
};

export default ShowCountry;
