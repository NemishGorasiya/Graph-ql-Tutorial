import { NetworkStatus, gql, useLazyQuery, useQuery } from "@apollo/client";
import MediaCard from "./MediaCard";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useRef } from "react";

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
  const pageNumberRef = useRef(2);
  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    GET_MEDIA,
    {
      variables: { page: 1, perPage: 5 },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => {
        pageNumberRef.current += 1;
      },
    }
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const {
    Page: { media: list },
  } = data || { Page: { media: [] } };

  return (
    <InfiniteScroll
      loadMore={() => {
        if (loadingMore || loading) {
          return;
        }

        fetchMore({
          variables: { page: pageNumberRef.current },
        });
      }}
      hasMore={true}
      loader={null}
      // initialLoad={false}
    >
      <div className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
        {list.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
        {loadingMore &&
          [...Array(12)].map((_, index) => (
            <div
              className="placeholder-card w-full aspect-[7/10] rounded bg-gray-50"
              key={index}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default MediaGallery;
