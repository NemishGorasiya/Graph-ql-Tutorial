import { gql, useQuery } from "@apollo/client";

const seasonList = [
	{ label: "Winter", value: "WINTER" },
	{ label: "Spring", value: "SPRING" },
	{ label: "Summer", value: "SUMMER" },
	{ label: "Fall", value: "FALL" },
];
const formatList = [
	{ label: "TV Show", value: "TV" },
	{ label: "Movie", value: "MOVIE" },
	{ label: "TV Short", value: "TV_SHORT" },
	{ label: "Special", value: "SPECIAL" },
	{ label: "OVA", value: "OVA" },
	{ label: "ONA", value: "ONA" },
	{ label: "Music", value: "MUSIC" },
];
const airingStatusList = [
	{ label: "Airing", value: "RELEASING" },
	{ label: "Finished", value: "FINISHED" },
	{ label: "Not Yet Aired", value: "NOT_YET_RELEASED" },
	{ label: "Cancelled", value: "CANCELLED" },
];

const nextYear = new Date().getFullYear() + 1;
const seasonYearList = Array.from(
	{ length: nextYear - 1940 + 1 },
	(_, i) => nextYear - i
);

const GET_GENRES = gql`
	query GetGenres {
		GenreCollection
	}
`;

const Filters = ({ updateFilters }) => {
	const { data, error, loading } = useQuery(GET_GENRES);
	const genresList = data?.GenreCollection || [];
	return (
		<div>
			<select
				name=""
				id=""
				onChange={(e) => updateFilters("genre", e.target.value)}
			>
				{genresList.length > 0 &&
					genresList.map((genre) => (
						<option key={genre} value={genre}>
							{genre}
						</option>
					))}
			</select>
			<select
				name=""
				id=""
				onChange={(e) => updateFilters("seasonYear", e.target.value)}
			>
				{seasonYearList.length > 0 &&
					seasonYearList.map((seasonYear) => (
						<option key={seasonYear} value={seasonYear}>
							{seasonYear}
						</option>
					))}
			</select>
			<select
				name=""
				id=""
				onChange={(e) => updateFilters("season", e.target.value)}
			>
				{seasonList.length > 0 &&
					seasonList.map((season) => {
						const { label, value } = season;
						return (
							<option key={value} value={value}>
								{label}
							</option>
						);
					})}
			</select>
			<select
				name=""
				id=""
				onChange={(e) => updateFilters("format", e.target.value)}
			>
				{formatList.length > 0 &&
					formatList.map((format) => {
						const { label, value } = format;
						return (
							<option key={value} value={value}>
								{label}
							</option>
						);
					})}
			</select>
			<select
				name=""
				id=""
				onChange={(e) => updateFilters("status", e.target.value)}
			>
				{airingStatusList.length > 0 &&
					airingStatusList.map((airingStatus) => {
						const { label, value } = airingStatus;
						return (
							<option key={value} value={value}>
								{label}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default Filters;
