import { useRef, useState } from "react";
import { EditIcon } from "../constants";

const About = ({ about }) => {
	const [isEditing, setIsEditing] = useState(false);
	const textAreaRef = useRef(null);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const updateAbout = () => {
		setIsEditing(false);
	};

	const cancelEdit = () => {
		setIsEditing(false);
		textAreaRef.current.value = about;
	};

	return (
		<div className="flex gap-4">
			<p className="flex">
				About :
				<textarea
					ref={textAreaRef}
					className={`${isEditing ? "outline" : ""} resize-none mx-2 px-2`}
					defaultValue={about}
					disabled={!isEditing}
				/>
			</p>
			{isEditing ? (
				<>
					<button onClick={cancelEdit}>Cancel</button>
					<button onClick={updateAbout}>Save</button>
				</>
			) : (
				<span onClick={handleEdit}>{EditIcon}</span>
			)}
		</div>
	);
};

export default About;
