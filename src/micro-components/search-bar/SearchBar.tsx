import searchIcon from "../../resources/go.png";

const SearchBar = () => {
  return (
    <form className="SearchBar">
      <input type="text" placeholder="Hello world." />
      <input
        type="image"
        src={searchIcon}
        alt="Search Icon"
        className="GLOBAL-SEARCH-IMAGE"
        onClick={() => console.log("hello!")}
      />
    </form>
  );
};

export default SearchBar;
