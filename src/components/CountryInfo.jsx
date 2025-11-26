import Weather from "./Weather";
import style from "./CountryInfo.module.css";

const CountryInfo = ({ countries }) => {
	return countries.map((country) => (
		<div className={style.country} key={country.name.common}>
			<h1 className={style.country__title}>
				{country.name.common}
				<a
					className={style.country__link}
					href={country.maps.googleMaps}
					target="_blank"
				>
					<img src="/open.svg" alt={`Map of ${country.name.common}`} />
				</a>
			</h1>
			<img
				className={style.country__img}
				src={country.flags.png}
				alt={`Flag of ${country.name.common}`}
			/>
			<div className={style.data}>
				<span className={style.data__left}>Capital</span>
				<span className={style.data__right}>{country.capital}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Area</span>
				<span className={style.data__right}>
					{`${country.area.toLocaleString()}`}km<sup>2</sup>
				</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Population</span>
				<span
					className={style.data__right}
				>{`${country.population.toLocaleString()}`}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Region</span>
				<span className={style.data__right}>{country.region}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Subregion</span>
				<span className={style.data__right}>{country.subregion}</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Languages</span>
				<span className={style.data__right}>
					<ul className={style.data__list}>
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
