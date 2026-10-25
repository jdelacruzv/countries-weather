import style from "./WeatherInfo.module.css";

const WeatherInfo = ({ data }) => {
	return (
		<div className={style.weather}>
			<h3 className={style.weather__title}>Weather in {data.name}</h3>
			<div className={style.info}>
				<p className={style.info_degrees}>{Math.round(data.main.temp)}°C</p>
				<img
					className={style.info__img}
					src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
					alt={data.weather[0].description}
				/>
				<p>wind {data.wind.speed.toFixed(1)} m/s</p>
			</div>
		</div>
	);
};

export default WeatherInfo;
