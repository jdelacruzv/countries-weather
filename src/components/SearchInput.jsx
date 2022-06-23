import style from "./SearchInput.module.css";

const SearchInput = ({ query, handleSearch }) => {
	return (
		<div className={style.search}>
			<input
				className={style.search__input}
				type="text"
				value={query}
				onChange={handleSearch}
				placeholder="Search country..."
			/>
		</div>
	);
};

export default SearchInput;
