import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { EditIcon } from "../constants";

const UPDATE_ABOUT = gql`
  mutation UpdateAbout($about: String) {
    UpdateUser(about: $about) {
      name
    }
  }
`;

const About = ({ about }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(null);

  const [updateAbout, { data, loading, error }] = useMutation(UPDATE_ABOUT);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveAbout = () => {
    setIsEditing(false);
    updateAbout({
      variables: { about: textAreaRef.current.value },
    });
    if (error) {
      textAreaRef.current.value = about;
      console.log("error", error);
    } else {
      console.log("about updated successfully");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    textAreaRef.current.value = about;
  };

  // if (error) {
  //   return <div>Error :(</div>;
  // }

  return (
    <div className="flex gap-4">
      <p className="flex">
        About :
        <textarea
          ref={textAreaRef}
          className={`${
            isEditing ? "outline outline-1" : ""
          } resize-none mx-2 px-2 bg-transparent`}
          defaultValue={about}
          disabled={!isEditing}
        />
      </p>
      {isEditing ? (
        <>
          <button onClick={cancelEdit} disabled={loading}>
            Cancel
          </button>
          <button onClick={saveAbout} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </>
      ) : (
        <span onClick={handleEdit} className="cursor-pointer">
          {EditIcon}
        </span>
      )}
    </div>
  );
};

export default About;
