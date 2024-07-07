import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EditIcon } from "../constants.jsx";
import About from "./About.jsx";

const UserProfile = () => {
	const { username } = useParams();

	const GET_USER = gql`
		query User {
			Viewer {
				id
				name
				avatar {
					medium
				}
				about
			}
		}
	`;

	const { data, loading, error } = useQuery(GET_USER);

	const { Viewer: { about, name, avatar: { medium: avatar } = {} } = {} } =
		data || {};

	return loading ? (
		<div>Loading...</div>
	) : (
		<div className="flex gap-4 p-4">
			<div>
				<img src={avatar} alt="" />
			</div>
			<div className="grow">
				<h1>Username : {name}</h1>
				<About about={about} />
			</div>
		</div>
	);
};

export default UserProfile;
