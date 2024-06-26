const MediaCard = ({ media }) => {
  const {
    title: { english },
    coverImage: { large },
    episodes,
    genres,
    startDate: { day, month, year },
    id,
  } = media;
  return (
    <div className="w-full aspect-[7/10] rounded relative group">
      <img
        className="w-full h-full object-cover rounded"
        src={large}
        alt="Media Banner"
      />
      <h1>{english}</h1>

      <div className="absolute top-1/2 left-full z-50 transform -translate-y-1/2 w-32 p-2 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
        <h1>{english}</h1>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
