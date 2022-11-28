interface IProps {
  loadMorePosts: (startIndex: number) => Promise<void>;
  startingIndexForPosts: number;
}

const LoadMoreButton = (props: IProps) => {
  return (
    <button
      className="GLOBAL-BUTTON-STYLING-RULES"
      onClick={async () => {
        const response = await props.loadMorePosts(props.startingIndexForPosts);
      }}
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
