import ClearSearchButton from "../../micro-components/clear-searchbar/ClearSearchButton";
import xbutton from "../../resources/x-button.png";

interface IProps {
  resetSearchBar: () => void;
}

const ClearSearchButtonContainer = (props: IProps) => {
  return (
    <div className="ClearSearchButtonContainer">
      <ClearSearchButton resetSearchBar={props.resetSearchBar} />
    </div>
  );
};

export default ClearSearchButtonContainer;
