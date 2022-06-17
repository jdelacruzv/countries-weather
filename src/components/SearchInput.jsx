import style from "./SearchInput.module.css";

const SearchInput = ({ query, handleSearch }) => {
	return (
		<div className={style.container}>
			<input
				className={style.search}
				type="text"
				value={query}
				onChange={handleSearch}
				placeholder="Search countries..."
			/>
		</div>
	);
};

export default SearchInput;
