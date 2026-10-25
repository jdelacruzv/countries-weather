import { useState } from "react";
import "./App.css";
import ListCountry from "./components/ListCountry";
import SearchInput from "./components/SearchInput";
import countriesData from "./data/countries.generated.json";

const App = () => {
	const [search, setSearch] = useState("");

	const handleSearch = (event) => setSearch(event.target.value);

	const earth = {
		url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Earth-spinning-rotating-animation-40.gif",
		text: "Earth-spinning-rotating",
	};

	return (
		<div className="app">
			<img className="image" src={earth.url} alt={earth.text} />
			<SearchInput query={search} handleSearch={handleSearch} />
			<ListCountry query={search} countries={countriesData} />
		</div>
	);
};

export default App;
