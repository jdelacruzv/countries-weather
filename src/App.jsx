import { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ListCountry from "./components/ListCountry";
import "./App.css";

const App = () => {
	const [countries, setContries] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
			setContries(data);
		});
	}, []);

	const handleSearch = (event) => setSearch(event.target.value);

	const earth = {
		url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Earth-spinning-rotating-animation-40.gif",
		text: "Earth-spinning-rotating",
	};

	return (
		<div className="app">
			<img className="image" src={earth.url} alt={earth.text} />
			<SearchInput query={search} handleSearch={handleSearch} />
			<ListCountry query={search} countries={countries} />
		</div>
	);
};

export default App;
