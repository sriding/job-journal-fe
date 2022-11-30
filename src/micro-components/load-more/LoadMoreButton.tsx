interface IProps {
  loadMorePosts: () => Promise<void>;
  startingIndexForPosts: number;
}

const LoadMoreButton = (props: IProps) => {
  return (
    <button
      className="GLOBAL-BUTTON-STYLING-RULES"
      onClick={async () => {
        const response = await props.loadMorePosts();
      }}
    >
      Load More (If Available)
    </button>
  );
};

export default LoadMoreButton;
