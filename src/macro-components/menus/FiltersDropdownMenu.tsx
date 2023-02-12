import FiltersDropdownOptions from "../../micro-components/menus/FiltersDropdownOptions";
import {
  jobStatusListings,
  jobTypeListings,
} from "../../shared/utilities/JobOptionsListings";
import { miscNotesListings } from "../../shared/utilities/MiscOptionsListings";

interface IProps {
  filterTagsTextList: Array<string>;
  setFilterTagsTextList: any;
}
const FiltersDropdownMenu = (props: IProps) => {
  return (
    <div>
      <div className="FiltersDropdownMenu">
        <FiltersDropdownOptions
          listTitle="Types"
          dropdownList={jobTypeListings}
          filterTagsTextList={props.filterTagsTextList}
          setFilterTagsTextList={props.setFilterTagsTextList}
        />
        <FiltersDropdownOptions
          listTitle="Statuses"
          dropdownList={jobStatusListings}
          filterTagsTextList={props.filterTagsTextList}
          setFilterTagsTextList={props.setFilterTagsTextList}
        />
        <FiltersDropdownOptions
          listTitle="Options"
          dropdownList={miscNotesListings}
          filterTagsTextList={props.filterTagsTextList}
          setFilterTagsTextList={props.setFilterTagsTextList}
        />
      </div>
    </div>
  );
};

export default FiltersDropdownMenu;
