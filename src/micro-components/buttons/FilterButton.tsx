interface IProps {
  displayFilterMenu: any;
  toggleDisplayFilterMenu: any;
}

const FilterButton = (props: IProps) => {
  return (
    <button
      type="button"
      className="FilterButton"
      onClick={() => props.toggleDisplayFilterMenu(!props.displayFilterMenu)}
    >
      Filters
    </button>
  );
};

export default FilterButton;
