import LoadMoreButton from "../../micro-components/load-more/LoadMoreButton";

interface IProps {
  loadMorePosts: (startIndex: number) => Promise<void>;
  startingIndexForPosts: number;
}

const LoadMoreButtonContainer = (props: IProps) => {
  return (
    <div className="LoadMoreButtonContainer">
      <LoadMoreButton
        loadMorePosts={props.loadMorePosts}
        startingIndexForPosts={props.startingIndexForPosts}
      />
    </div>
  );
};

export default LoadMoreButtonContainer;
