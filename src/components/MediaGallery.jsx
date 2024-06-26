import { gql, useQuery } from "@apollo/client";
import MediaCard from "./MediaCard";
import InfiniteScroll from "react-infinite-scroller";

const GET_MEDIA = gql`
	query GetMedia($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media {
				title {
					english
				}
				coverImage {
					large
				}
				episodes
				genres
				startDate {
					day
					month
					year
				}
				id
			}
		}
	}
`;

const updateQuery = (previousResult, { fetchMoreResult }) => {
	if (!fetchMoreResult) {
		return previousResult;
	}

	const previousMedia = previousResult.Page.media;
	const fetchMoreMedia = fetchMoreResult.Page.media;
	fetchMoreResult.Page.media = [...previousMedia, ...fetchMoreMedia];

	return { ...fetchMoreResult };
};

const MediaGallery = () => {
	const { data, loading, error, fetchMore } = useQuery(GET_MEDIA, {
		variables: { page: 1, perPage: 20 },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const {
		Page: { media: list },
	} = data || {};
	return (
		<InfiniteScroll
			pageStart={0}
			loadMore={() => fetchMore({ variables: { page: 2 }, updateQuery })}
			hasMore={true || false}
			loader={
				<div className="loader" key={0}>
					Loading ...
				</div>
			}
		>
			<div className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
				{list.map((media) => (
					<MediaCard key={media.id} media={media} />
				))}
			</div>
		</InfiniteScroll>
	);
};

export default MediaGallery;
