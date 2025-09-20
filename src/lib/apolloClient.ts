import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
});

// Create the auth link using SetContextLink
const authLink = new SetContextLink((prevContext, operation) => {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = ApolloLink.from([authLink, httpLink]);

// Create the client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
