import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import "./index.css";

const client = new ApolloClient({
	uri: "https://graphql.anilist.co",
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

							console.log("incoming", incoming);

							let merged = { ...incoming };
							// merged["media({})"] = existing["media({})"]
							// 	? [...existing["media({})"], ...incoming["media({})"]]
							// 	: [...incoming["media({})"]];
							// console.log("merged", merged);
							for (let key in incoming) {
								if (key.startsWith("media")) {
									merged[key] = existing[key]
										? [...existing[key], ...incoming[key]]
										: [...incoming[key]];
								} else {
									merged[key] = incoming[key];
								}
							}
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
