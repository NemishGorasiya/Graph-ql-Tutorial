import { memo } from "react";
import { Link } from "react-router-dom";

const MediaCard = memo(({ media }) => {
  const {
    title: { english },
    coverImage: { large },
    id,
  } = media;

  return (
    <Link to={`/${id}`}>
      <div className="w-full aspect-[7/10] rounded">
        <img
          className="w-full h-full object-cover rounded"
          src={large}
          alt="Media Banner"
        />
        <h1 className="line-clamp-2">{english}</h1>
      </div>
    </Link>
  );
});
MediaCard.displayName = "MediaCard";
export default MediaCard;
