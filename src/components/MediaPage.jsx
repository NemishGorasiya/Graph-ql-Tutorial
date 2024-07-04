import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

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
      duration
    }
  }
`;

const MediaPage = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MEDIA, {
    variables: {
      id,
    },
  });
  const {
    Media: {
      bannerImage,
      coverImage: { large = "" } = {},
      duration,
      title: { english = "" } = {},
      rankings: { rank } = {},
    } = {},
  } = data || {};
  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div className="">
      <div className="h-64 w-full">
        <img className="h-full w-full object-cover" src={bannerImage} alt="" />
      </div>
      <div className="flex gap-4">
        <img src={large} alt="" />
        <div>
          <h1 className="text-2xl font-bold">{english}</h1>
          <p>{rank}</p>
          <p className="text-xl font-bold">Duration : {duration}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
