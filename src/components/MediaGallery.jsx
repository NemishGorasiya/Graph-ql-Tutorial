import { NetworkStatus, gql, useLazyQuery, useQuery } from "@apollo/client";
import MediaCard from "./MediaCard";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useRef, useState } from "react";
import "./MediaGallery.scss";

const GET_MEDIA = gql`
  query GetMedia($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
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
  const [_fetchData, { data, loading, fetchMore }] = useLazyQuery(GET_MEDIA, {
    variables: { page: 1, perPage: 5 },
  });

  const isLoadingRef = useRef(false);
  const pageNumberRef = useRef(1);

  const loadMore = (page) => {
    if (isLoadingRef.current || loading) {
      return;
    }

    isLoadingRef.current = true;
    console.log("loading", loading);
    fetchMore({
      variables: { page: pageNumberRef.current },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        isLoadingRef.current = false;
        pageNumberRef.current += 1;
        console.log("prev", previousQueryResult);
        console.log("new", fetchMoreResult);
        if (!fetchMoreResult) {
          return previousQueryResult;
        }
        const mergedResult = {
          Page: {
            __typename: "Page",
            media: [
              ...(previousQueryResult?.Page?.media || []),
              ...(fetchMoreResult?.Page?.media || []),
            ],
          },
        };
        console.log("merged", mergedResult);
        return mergedResult;
      },
    });
  };

  const list = data?.Page?.media || [];
  console.log("data", data);
  console.log("loadin ref", isLoadingRef);
  return (
    <>
      <div className="media-grid">
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={true}
          loader={<h1 key={"loader"}>Loading...</h1>}
        >
          {list.length > 0 &&
            list.map((media) => <MediaCard key={media.id} media={media} />)}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default MediaGallery;
