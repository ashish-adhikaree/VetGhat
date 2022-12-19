import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
    ApolloLink
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

export const createClient = (jwt: string) => {
    const link = from([
        errorLink,
        new HttpLink({
            uri: process.env.URI || "http://localhost:1337/graphql",
        }),
    ]);
    
    const authLink = new ApolloLink((operation, forward) => {
        // Retrieve the authorization token from local storage.
        const token = jwt
        // Use the setContext method to set the HTTP headers.
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        });
      
        // Call the next link in the middleware chain.
        return forward(operation);
      });
    
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(link), // Chain it with the HttpLink
    });

    return client
}