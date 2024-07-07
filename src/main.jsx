import React from "react";
import ReactDOM from "react-dom/client";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import App from "./App.jsx";
import "./index.css";
import { getCookie } from "./helper.jsx";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: "https://graphql.anilist.co",
});

const authLink = setContext((_, { headers }) => {
	const accessToken = getCookie("accessToken");
	return {
		headers: {
			...headers,
			...(accessToken && { Authorization: `Bearer ${accessToken}` }),
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					Page: {
						keyArgs: false,
						merge: (existing = {}, incoming) => {
							if (!existing) {
								return incoming;
							}
							let merged = { ...incoming };

							merged.media = existing.media
								? [...existing.media, ...incoming.media]
								: incoming.media;
							return merged;
						},
					},
				},
			},
		},
	}),
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
