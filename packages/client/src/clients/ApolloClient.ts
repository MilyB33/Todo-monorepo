import { ApolloClient as Client, InMemoryCache, gql, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token")?.replaceAll(`"`, "");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const ApolloClient = new Client({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Mutations:
const CREATE_USER = gql`
  mutation register($input: CreateUserInput!) {
    createUser(input: $input) {
      message
    }
  }
`;

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      data {
        user {
          _id
          username
          email
        }
        token
      }
      message
    }
  }
`;

const CREATE_COLLECTION = gql`
  mutation createCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      message
    }
  }
`;

// Queries:
const ME = gql`
  query {
    me {
      _id
      username
      email
    }
  }
`;

const DEFAULT_ICONS = gql`
  query getImages($input: SearchImageInput!) {
    getImages(input: $input) {
      data {
        images {
          name
          fileId
          url
        }
      }
      message
    }
  }
`;

const GET_COLLECTIONS = gql`
  query {
    getCollections {
      data {
        collections {
          _id
          name
          color
          iconUrl
          owner
          tasks
        }
      }
      message
    }
  }
`;

export const queries = {
  query: {
    DEFAULT_ICONS,
    GET_COLLECTIONS,
  },
  mutation: {
    CREATE_USER,
    LOGIN,
    CREATE_COLLECTION,
  },
};
