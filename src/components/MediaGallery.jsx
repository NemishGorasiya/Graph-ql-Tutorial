import { NetworkStatus, gql, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MediaCard from "./MediaCard";
import Filters from "./Filters";

const GET_MEDIA = gql`
  query FetchMedia(
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
        status
      }
    }
  }
`;

const LIMIT_PER_PAGE = 15;

const MediaGallery = () => {
  const [filters, setFilters] = useState({});
  const { data, loading, fetchMore, networkStatus, refetch } = useQuery(
    GET_MEDIA,
    {
      variables: {
        page: 1,
        perPage: LIMIT_PER_PAGE,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const pageNumberRef = useRef(2);
  const hasMoreRef = useRef(true);

  const loadMore = async () => {
    try {
      if (
        !hasMoreRef.current ||
        networkStatus === NetworkStatus.refetch ||
        networkStatus === 3 ||
        loading
      ) {
        return;
      }

      const { data } = await fetchMore({
        variables: {
          page: pageNumberRef.current,
          perPage: LIMIT_PER_PAGE,
        },
      });
      if (data) {
        if (data.Page.media.length < LIMIT_PER_PAGE) {
          hasMoreRef.current = false;
        }
        pageNumberRef.current += 1;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateFilters = (key, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (value) {
        newFilters[key] = value;
      } else {
        newFilters[key] = undefined;
      }

      refetch({ ...newFilters, page: 1, perPage: LIMIT_PER_PAGE });
      pageNumberRef.current = 2;
      return newFilters;
    });
  };

  const list = data?.Page?.media || [];

  return (
    <div className="flex flex-col gap-4">
      <Filters updateFilters={updateFilters} />
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMoreRef.current}
        loader={<h1 key={"loader"}>Loading...</h1>}
        className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-8"
      >
        {list.length > 0 &&
          list.map((media) => <MediaCard key={media.id} media={media} />)}
      </InfiniteScroll>
    </div>
  );
};

export default MediaGallery;
