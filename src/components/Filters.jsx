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
    <div className="filters flex gap-4 flex-wrap">
      <div className="select-wrapper">
        <p>Genres</p>
        <select
          name=""
          id=""
          onChange={(e) => updateFilters("genre", e.target.value)}
          className="border-solid border-2 rounded"
        >
          <option value="">Any</option>
          {genresList.length > 0 &&
            genresList.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>
      </div>
      <div className="select-wrapper">
        <p>Year</p>
        <select
          name=""
          id=""
          onChange={(e) => updateFilters("seasonYear", Number(e.target.value))}
          className="border-solid border-2 rounded"
        >
          <option value="">Any</option>
          {seasonYearList.length > 0 &&
            seasonYearList.map((seasonYear) => (
              <option key={seasonYear} value={seasonYear}>
                {seasonYear}
              </option>
            ))}
        </select>
      </div>
      <div className="select-wrapper">
        <p>Season</p>
        <select
          name=""
          id=""
          onChange={(e) => updateFilters("season", e.target.value)}
          className="border-solid border-2 rounded"
        >
          <option value="">Any</option>
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
      </div>
      <div className="select-wrapper">
        <p>Format</p>
        <select
          name=""
          id=""
          onChange={(e) => updateFilters("format", e.target.value)}
          className="border-solid border-2 rounded"
        >
          <option value="">Any</option>
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
      </div>
      <div className="select-wrapper">
        <p>Airing Status</p>
        <select
          name=""
          id=""
          onChange={(e) => updateFilters("status", e.target.value)}
          className="border-solid border-2 rounded"
        >
          <option value="">Any</option>
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
    </div>
  );
};

export default Filters;
