import { useState } from "react";
import CountryInfo from "./CountryInfo";
import style from "./ShowCountry.module.css";

const ShowCountry = ({ filteredQuery }) => {
	const [info, setInfo] = useState(false);
	const [filter, setFilter] = useState(true);
	const [cty, setCty] = useState({});

	const handleShowInfo = (cty) => {
		setInfo(!info);
		setFilter(!filter);
		setCty(cty);
	};

	const filteredCountries = filteredQuery.map(country => (
		<div className={style.row} key={country.name.common}>
			<p className={style.row__text}>
				{country.name.common}
			</p>
			<button 
				className={style.row__btn}
				onClick={() => handleShowInfo(country)}
			>
				show
			</button>
		</div>
	));

	const countryData = filteredQuery.length === 1 ? filteredQuery[0] : [cty];

	return (
		<div className={style.container}>
			{filter && filteredCountries}
			{info && <CountryInfo filteredQuery={countryData} />}
		</div>		
	);
};

export default ShowCountry;
