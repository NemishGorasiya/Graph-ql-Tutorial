import { useParams } from "react-router";

const AnimeProfile = () => {
  const { id } = useParams();
  return <div>AnimeProfile {id}</div>;
};

export default AnimeProfile;
