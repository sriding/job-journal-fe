import deleteIcon from "./../../resources/x-button.png";

interface IProps {
  tagText: string;
  filterTagsTextList: Array<string>;
  setFilterTagsTextList: any;
}

const GenericTag = (props: IProps) => {
  return (
    <div>
      <img
        src={deleteIcon}
        alt="delete icon"
        style={{
          width: "7px",
          height: "7px",
          position: "relative",
          top: "10px",
          left: "2px",
          cursor: "pointer",
        }}
        onClick={() => {
          props.setFilterTagsTextList(
            props.filterTagsTextList.filter((val) => {
              return val !== props.tagText;
            })
          );
        }}
      ></img>
      <div className="GenericTag">{props.tagText}</div>
    </div>
  );
};

export default GenericTag;
