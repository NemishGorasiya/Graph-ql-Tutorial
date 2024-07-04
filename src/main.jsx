import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import "./index.css";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache({
    addTypename: true,
    typePolicies: {
      Page: {
        fields: {
          media: {
            keyArgs: false,
            merge(existing = [], incoming) {
              console.log("existing", existing);
              console.log("incoming", incoming);
              if (!incoming) return existing;
              if (!existing) return incoming;
              return [...existing, ...incoming];
            },
            read(existing, { args }) {
              console.log("args", args);
              console.log("existing", existing);
            },
          },
        },
        read(existing, { args }) {
          console.log("args", args);
          console.log("existing", existing);
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
