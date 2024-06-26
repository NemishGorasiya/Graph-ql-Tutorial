import { gql, useQuery } from "@apollo/client";
import MediaCard from "./MediaCard";

const GET_MEDIA = gql`
  query GetMedia($page: Int) {
    Page(page: $page) {
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

const MediaGallery = () => {
  const { data, loading, error } = useQuery(GET_MEDIA, {
    variables: { page: 1 },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data);
  const {
    Page: { media: list },
  } = data || {};
  return (
    <div className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
      {list.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  );
};

export default MediaGallery;
