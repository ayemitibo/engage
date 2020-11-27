import Vue from "vue";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import { onError } from "apollo-link-error";
Vue.use(VueApollo);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from localstorage if it exists

  const token = localStorage.getItem("admin_token");

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  }
});

const httpLink = createUploadLink({
  uri: "http://localhost:1337/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
