import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import App from "./App.jsx";
import { getCookie, getNewToken } from "./helper.jsx";
import "./index.css";

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // can be used to get new token and retry with new token
        // switch (err.extensions.code) {
        //   case "UNAUTHENTICATED": {
        //     const oldHeaders = operation.getContext().headers;
        //     operation.setContext({
        //       headers: {
        //         ...oldHeaders,
        //         Authorization: getNewToken(),
        //       },
        //     });
        //     return forward(operation);
        //   }
        // }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

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

const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  link,
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
