interface IProps {
  listTitle: string;
  dropdownList: Array<string>;
  filterTagsTextList: Array<string>;
  setFilterTagsTextList: any;
}

const FiltersDropdownOptions = (props: IProps) => {
  return (
    <div>
      <h4 className="FiltersDropdownOptionsTitle">{props.listTitle}</h4>
      <div className="FiltersDropdownOptions">
        {props.dropdownList.map((val, ind) => {
          return (
            <button
              key={ind}
              type="button"
              onClick={() => {
                if (!props.filterTagsTextList.includes(val)) {
                  props.setFilterTagsTextList([
                    ...props.filterTagsTextList,
                    val,
                  ]);
                }
              }}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FiltersDropdownOptions;
