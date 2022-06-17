import Weather from "./Weather";
import style from "./CountryInfo.module.css";

const CountryInfo = ({ filteredQuery }) => {
	return filteredQuery.map((country) => (
		<div className={style.container} key={country.name.common}>
			<h1>{country.name.common}</h1>
			<img src={country.flags.png} alt={country.name.common} />
			<div className={style.data}>
				<span className={style.data__left}>Capital:</span>
				<span className={style.data__right}>{country.capital}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Area:</span>
				<span className={style.data__right}>{country.area}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Population:</span>
				<span className={style.data__right}>{country.population}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Region:</span>
				<span className={style.data__right}>{country.region}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Subregion:</span>
				<span className={style.data__right}>{country.subregion}</span>
			</div>

			<div className={style.data}>
				<span className={style.data__left}>Languages:</span>
				<span className={style.data__right}>
					<ul>
						{Object.values(country.languages).map((lang) => (
							<li key={lang}>{lang}</li>
						))}
					</ul>
				</span>
			</div>
			<Weather capitalName={country.capital} />
		</div>
	));
};

export default CountryInfo;
