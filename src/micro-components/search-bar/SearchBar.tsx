import searchIcon from "../../resources/go.png";

interface IProps {
  fetchFilteredPosts: () => void;
  searchBarText: string;
  setSearchBarText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: IProps) => {
  return (
    <form className="SearchBar">
      <input
        type="text"
        placeholder="Search posts..."
        value={props.searchBarText}
        onChange={(event: any) => props.setSearchBarText(event.target.value)}
      />
      <input
        type="image"
        src={searchIcon}
        alt="Search Icon"
        className="GLOBAL-SEARCH-IMAGE"
        onClick={(event) => {
          event.preventDefault();
          props.fetchFilteredPosts();
        }}
      />
    </form>
  );
};

export default SearchBar;
