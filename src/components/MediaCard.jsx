import { memo } from "react";

const MediaCard = memo(({ media }) => {
	const {
		title: { english },
		coverImage: { large },
		episodes,
		genres,
		startDate: { day, month, year },
		id,
	} = media;
	return (
		<div className="w-full aspect-[7/10] rounded">
			<img
				className="w-full h-full object-cover rounded"
				src={large}
				alt="Media Banner"
			/>
			<h1 className="line-clamp-2">{english}</h1>
		</div>
	);
});
MediaCard.displayName = "MediaCard";
export default MediaCard;
