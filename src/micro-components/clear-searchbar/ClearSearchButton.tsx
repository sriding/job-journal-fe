interface IProps {
  resetSearchBar: () => void;
}

const ClearSearchButton = (props: IProps) => {
  return (
    <button className="ClearSearchButton" onClick={props.resetSearchBar}>
      Reset Search
    </button>
  );
};

export default ClearSearchButton;
