# Countries Weather

Search country details from a local country catalog and load current weather for
the selected country's capital.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `OPENWEATHER_API_KEY` in `.env.local` using an active OpenWeather key.
3. Run `npm run dev`.

The weather key is read by the local Vite server and is never included in the
browser bundle. Country names, capitals, area, regions, and languages come from
the local catalog. Population is refreshed during generation from the World
Bank's `SP.POP.TOTL` indicator, using the latest non-empty annual observation.
The generated data includes the observation year; countries without an
available observation show `Not available`. Generation requires Internet access.
Country data is provided by `world-countries` under the ODbL-1.0 license.

## Netlify deployment

Set `OPENWEATHER_API_KEY` in the site's Netlify environment variables and deploy.
The `/api/weather` route is forwarded to the Netlify Function. Do not configure
the key with a `VITE_` prefix.

Live site: https://countries-weather-search-api.netlify.app/
