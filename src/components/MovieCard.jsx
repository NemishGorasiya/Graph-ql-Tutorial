const MovieCard = ({ movie }) => {
  const { title, releaseDate } = movie || {};
  return (
    <div className="bg-gray-200 p-2 rounded-md">
      <div>{title}</div>
      <div>{releaseDate}</div>
    </div>
  );
};

export default MovieCard;
