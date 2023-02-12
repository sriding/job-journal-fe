import GenericTag from "../../micro-components/tags/GenericTag";

interface IProps {
  filterTagsTextList: Array<any>;
  setFilterTagsTextList: any;
}

const FilterTagsContainer = (props: IProps) => {
  return (
    <div className="FilterTagsContainer">
      {props.filterTagsTextList.map((val, ind) => {
        return (
          <GenericTag
            key={ind}
            tagText={val}
            filterTagsTextList={props.filterTagsTextList}
            setFilterTagsTextList={props.setFilterTagsTextList}
          ></GenericTag>
        );
      })}
    </div>
  );
};

export default FilterTagsContainer;
