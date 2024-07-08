import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import Markdown from "react-markdown";

const GET_CHARACTER = gql`
  query Character($characterId: Int) {
    Character(id: $characterId) {
      gender
      image {
        large
      }
      name {
        full
      }
      description
    }
  }
`;

const AnimeProfile = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_CHARACTER, {
    variables: {
      characterId: id,
    },
  });

  const {
    Character: {
      description = "",
      gender = "",
      image: { large = "" } = {},
      name: { full = "" } = {},
    } = {},
  } = data || {};

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex gap-4">
      <div className="min-h-64 min-w-64">
        <img className="h-full w-full" src={large} alt="" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{full}</h1>
        {/* <p>{description}</p> */}
        <Markdown>{description}</Markdown>
        <p className="text-xl font-bold">Gender : {gender}</p>
      </div>
    </div>
  );
};

export default AnimeProfile;
