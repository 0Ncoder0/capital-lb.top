import { ApolloClient, InMemoryCache, DocumentNode } from "@apollo/client/core";

type Requester<R> = <V, C>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;

interface Requesters {
  query: Requester<any>;
  mutate: Requester<any>;
}

export const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

export const requesters: Requesters = {
  query: async (query, variables, options) =>
    await client.query({ query, variables, ...options }).then(({ data }) => data),
  mutate: async (query, variables, options) =>
    await client.query({ query, variables, ...options }).then(({ data }) => data),
};
