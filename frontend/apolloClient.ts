import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    } else if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const link = from([
    errorLink,
    new HttpLink({
        uri: process.env.URI || "http://localhost:1337/graphql",
    }),
]);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});