import { NetworkStatus, gql, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MediaCard from "./MediaCard";
import Filters from "./Filters";

const GET_MEDIA = gql`
  query FetchMedia(
    $page: Int
    $perPage: Int
    $status: MediaStatus
    $format: MediaFormat
  ) {
    Page(page: $page, perPage: $perPage) {
      media(status: $status, format: $format) {
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

const MediaGallery = () => {
  // const [filters, setFilters] = useState({});
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_MEDIA, {
    variables: {
      page: 1,
      perPage: 15,
    },
    notifyOnNetworkStatusChange: true,
  });
  const pageNumberRef = useRef(2);

  const loadMore = async () => {
    try {
      if (
        networkStatus === NetworkStatus.refetch ||
        networkStatus === 3 ||
        loading
      ) {
        return;
      }

      const { data } = await fetchMore({
        variables: {
          page: pageNumberRef.current,
          perPage: 15,
        },
      });
      console.log("data", data);
      if (data) {
        pageNumberRef.current += 1;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const updateFilters = (key, value) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  //   refetch({ variables: { ...filters, [key]: value, page: 1, perPage: 15 } });
  //   pageNumberRef.current = 2;
  // };

  const list = data?.Page?.media || [];

  return (
    <>
      {/* <Filters updateFilters={updateFilters} /> */}
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
