import FilterButton from "../../../micro-components/buttons/FilterButton";

interface IProps {
  displayFilterMenu: any;
  toggleDisplayFilterMenu: any;
}

const FilterButtonContainer = (props: IProps) => {
  return (
    <div className="FilterButtonContainer">
      <FilterButton
        displayFilterMenu={props.displayFilterMenu}
        toggleDisplayFilterMenu={props.toggleDisplayFilterMenu}
      />
    </div>
  );
};

export default FilterButtonContainer;
