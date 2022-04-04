import { ApolloClient as Client, InMemoryCache, gql } from "@apollo/client";

export const ApolloClient = new Client({
  uri: "http://localhost:4000/api/graphql",
  cache: new InMemoryCache(),
});

// Mutations:
const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      message
    }
  }
`;

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      email
      token
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

export const queries = {
  query: {},
  mutation: {
    CREATE_USER,
    LOGIN,
  },
};
