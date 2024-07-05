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

// const client = new ApolloClient({
//   uri: "https://graphql.anilist.co",
//   cache: new InMemoryCache({
//     typePolicies: {
//       Page: {
//         fields: {
//           media: {
//             keyArgs: false,
//             merge: (existing = [], incoming) => {
//               if (!existing) {
//                 return incoming;
//               }
//               return [...existing, ...incoming];
//             },
//           },
//         },
//       },
//     },
//   }),
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
