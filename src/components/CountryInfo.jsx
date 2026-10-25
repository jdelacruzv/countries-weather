import style from "./CountryInfo.module.css";
import Weather from "./Weather";

const CountryInfo = ({ countries }) => {
	return countries.map((country) => (
		<div className={style.country} key={country.name.common}>
			<h1 className={style.country__title}>
				{country.name.common}
				<a
					className={style.country__link}
					href={country.maps.googleMaps}
					target="_blank"
					rel="noreferrer"
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
				<span className={style.data__right}>
					{country.capital.length ? country.capital.join(", ") : "Not available"}
				</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Area</span>
				<span className={style.data__right}>
					{Number.isFinite(country.area)
						? country.area.toLocaleString()
						: "Not available"}
					{Number.isFinite(country.area) && (
						<>
							km<sup>2</sup>
						</>
					)}
				</span>
			</div>
			<div className={style.data}>
				<span className={style.data__left}>Population</span>
				<span className={style.data__right}>
					{Number.isFinite(country.population)
						? `${country.population.toLocaleString()} (${country.populationYear})`
						: "Not available"}
				</span>
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
						{Object.values(country.languages ?? {}).map((lang, index) => (
							<li key={`${lang}-${index}`}>{lang}</li>
						))}
					</ul>
				</span>
			</div>
			<Weather capitalName={country.capital[0]} />
		</div>
	));
};

export default CountryInfo;
