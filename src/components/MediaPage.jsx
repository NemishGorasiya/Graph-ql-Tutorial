import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation, useSuspenseQuery } from "@apollo/client";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { favouriteIcon } from "../icons";

const GET_MEDIA = gql`
  query Media($id: Int) {
    Media(id: $id) {
      title {
        english
      }
      rankings {
        rank
      }
      coverImage {
        large
      }
      bannerImage
      description
      isFavouriteBlocked
      isFavourite
    }
  }
`;

const TOGGLE_FAVOURITE = gql`
  mutation ToggleFavourite($animeId: Int) {
    ToggleFavourite(animeId: $animeId) {
      anime {
        edges {
          id
        }
      }
    }
  }
`;

const MediaPage = () => {
  const { id } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const { data } = useSuspenseQuery(GET_MEDIA, {
    variables: {
      id,
    },
    onCompleted: (data) => {
      setIsFavourite(data?.Media?.isFavourite);
    },
  });
  const [toggleFavourite, { error: toggleFavouriteError }] =
    useMutation(TOGGLE_FAVOURITE);

  const {
    Media: {
      bannerImage,
      coverImage: { large = "" } = {},
      description,
      title: { english = "" } = {},
      rankings: { rank } = {},
      isFavouriteBlocked,
    } = {},
  } = data || {};

  const handleToggleFavourite = () => {
    if (isFavouriteBlocked) {
      console.log("favourite blocked");
      return;
    }
    toggleFavourite({
      variables: {
        animeId: id,
      },
    });
    if (toggleFavouriteError) {
      console.log("error", toggleFavouriteError);
    } else {
      console.log("Favorite toggled");
      setIsFavourite(!isFavourite);
    }
  };

  return (
    <div className="">
      <div className="h-64 w-full">
        <img className="h-full w-full object-cover" src={bannerImage} alt="" />
      </div>
      <div className="flex gap-4">
        <img src={large} alt="image" />
        <div>
          <h1 className="text-2xl font-bold">{english}</h1>
          <p>{rank}</p>
          <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
          <button
            className="flex gap-2 border-2 p-2 rounded-md"
            onClick={handleToggleFavourite}
          >
            Favourite {favouriteIcon(isFavourite)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
