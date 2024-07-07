import React from "react";
import InfiniteScroll from "react-infinite-scroller";

const UsersPage = () => {
	return (
		<div className="flex flex-col gap-4 p-4">
			{/* <InfiniteScroll
				loadMore={loadMore}
				hasMore={hasMoreRef.current}
				loader={<h1 key={"loader"}>Loading...</h1>}
				className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-8"
			>
				{list.length > 0 &&
					list.map((media) => <MediaCard key={media.id} media={media} />)}
			</InfiniteScroll> */}
		</div>
	);
};

export default UsersPage;
