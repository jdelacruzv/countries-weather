import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";

const Weather = ({ capitalName }) => {
	const [weather, setWeather] = useState({
		loading: false,
		data: null,
		error: "",
	});

	useEffect(() => {
		if (!capitalName) {
			setWeather({ loading: false, data: null, error: "No capital is listed." });
			return undefined;
		}

		const controller = new AbortController();
		const query = new URLSearchParams({ capital: capitalName });
		setWeather({ loading: true, data: null, error: "" });

		fetch(`/api/weather?${query}`, { signal: controller.signal })
			.then(async (response) => {
				const result = await response.json();
				if (!response.ok) {
					throw new Error(result.error || "Weather data is unavailable.");
				}
				return result;
			})
			.then((data) => setWeather({ loading: false, data, error: "" }))
			.catch((error) => {
				if (error.name !== "AbortError") {
					setWeather({ loading: false, data: null, error: error.message });
				}
			});

		return () => controller.abort();
	}, [capitalName]);

	if (weather.loading) return <p aria-live="polite">Loading weather...</p>;
	if (weather.error)
		return <p role="status">Weather unavailable: {weather.error}</p>;
	return weather.data ? <WeatherInfo data={weather.data} /> : null;
};

export default Weather;
