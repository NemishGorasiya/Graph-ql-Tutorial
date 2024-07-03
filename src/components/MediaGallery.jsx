import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MediaCard from "./MediaCard";
import Filters from "./Filters";

const GET_MEDIA = gql`
  query GetMedia(
    $page: Int
    $perPage: Int
    $genre: String
    $seasonYear: Int
    $season: MediaSeason
    $format: MediaFormat
    $status: MediaStatus
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        genre: $genre
        seasonYear: $seasonYear
        season: $season
        format: $format
        status: $status
      ) {
        id
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
      }
    }
  }
`;

const MediaGallery = () => {
  const [fetchData, { data, loading, fetchMore }] = useLazyQuery(GET_MEDIA, {
    variables: { perPage: 25, page: 1 },
  });
  const [filters, setFilters] = useState({});

  const isLoadingRef = useRef(false);
  const pageNumberRef = useRef(1);

  const updateFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    fetchData({ variables: { ...filters, [key]: value, page: 1 } });
    pageNumberRef.current = 2;
  };

  const loadMore = () => {
    if (isLoadingRef.current || loading) {
      return;
    }
    isLoadingRef.current = true;
    fetchMore({
      variables: {
        page: pageNumberRef.current,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        isLoadingRef.current = false;
        if (!fetchMoreResult) {
          return previousQueryResult;
        }
        pageNumberRef.current += 1;
        const mergedResult = {
          Page: {
            __typename: "Page",
            media: [
              ...(previousQueryResult?.Page?.media || []),
              ...(fetchMoreResult?.Page?.media || []),
            ],
          },
        };
        return mergedResult;
      },
    });
  };

  console.log("filters", filters);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const list = data?.Page?.media || [];

  return (
    <>
      <Filters updateFilters={updateFilters} />
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={true}
        loader={<h1 key={"loader"}>Loading...</h1>}
        className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-8"
      >
        {list.length > 0 &&
          list.map((media) => <MediaCard key={media.id} media={media} />)}
      </InfiniteScroll>
    </>
  );
};

export default MediaGallery;
