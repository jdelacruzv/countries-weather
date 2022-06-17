import axios from "axios";
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";

const Weather = ({ capitalName }) => {
	const [city, setCity] = useState({});
	const [viewData, setViewData] = useState(false);

	useEffect(() => {
		const api_key = import.meta.env.VITE_REACT_APP_API_KEY;

		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${api_key}`)
			.then(({ data }) => {
				setCity(data);
				setViewData(true);
			});
	}, []);

	return viewData ? <WeatherInfo data={city} /> : undefined;
};

export default Weather;
