import { ApolloClient as Client, InMemoryCache, gql } from "@apollo/client";

export const ApolloClient = new Client({
  uri: "http://localhost:4000/api/graphql",
  cache: new InMemoryCache(),
});

ApolloClient.query({
  query: gql`
    query {
      me {
        username
      }
    }
  `,
});

(() => {
  console.log("tak");
})();

// Mutations:
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
  },
};
