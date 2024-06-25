import { gql, useQuery } from "@apollo/client";
import MovieCard from "./MovieCard";

const GET_MOVIES = gql`
  query GetMovies {
    allFilms {
      films {
        title
        releaseDate
      }
    }
  }
`;

const DisplayMovie = () => {
  const { data, loading, error } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const {
    allFilms: { films },
  } = data;

  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {films.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default DisplayMovie;
