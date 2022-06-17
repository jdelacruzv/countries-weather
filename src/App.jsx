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

	return (
    <div className="app">
      <SearchInput query={search} handleSearch={handleSearch} />
      <ListCountry query={search} countries={countries} />
    </div>
	);
};

export default App;
