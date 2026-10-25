import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { weatherHandler } from "./netlify/functions/weather.mjs";

const localApi = {
	name: "local-weather-api",
	configureServer(server) {
		server.middlewares.use("/api/weather", async (request, response, next) => {
			if (request.method !== "GET") return next();

			try {
				const result = await weatherHandler(
					new Request(`http://localhost${request.url ?? "/"}`),
				);
				response.statusCode = result.status;
				result.headers.forEach((value, key) => response.setHeader(key, value));
				response.end(await result.text());
			} catch (error) {
				next(error);
			}
		});
	},
};

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	process.env.OPENWEATHER_API_KEY ??=
		env.OPENWEATHER_API_KEY ?? env.VITE_REACT_APP_API_KEY;

	return {
		plugins: [react(), localApi],
	};
});
