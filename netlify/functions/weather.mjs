const json = (data, status = 200) =>
	new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});

export async function weatherHandler(request) {
	const capital = new URL(request.url).searchParams.get("capital")?.trim();
	if (!capital) return json({ error: "A capital city is required." }, 400);

	const apiKey = process.env.OPENWEATHER_API_KEY;
	if (!apiKey) return json({ error: "Weather service is not configured." }, 503);

	const url = new URL("https://api.openweathermap.org/data/2.5/weather");
	url.searchParams.set("q", capital);
	url.searchParams.set("appid", apiKey);
	url.searchParams.set("units", "metric");

	try {
		const response = await fetch(url);
		const data = await response.json();
		if (!response.ok) {
			const error =
				response.status === 401
					? "The weather API key is invalid."
					: response.status === 404
						? "Weather is unavailable for this capital."
						: "The weather provider is temporarily unavailable.";
			return json({ error }, response.status === 404 ? 404 : 502);
		}

		return json(data);
	} catch {
		return json({ error: "Could not connect to the weather provider." }, 502);
	}
}

export default async (request) => weatherHandler(request);
