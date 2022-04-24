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

// Fragments
const USER_FIELDS = gql`
  fragment UserFields on User {
    _id
    name
    surname
    email
    avatar
  }
`;

const TASK_FIELDS = gql`
  fragment TaskFields on Task {
    _id
    description
    date
    time
    completed
    collectionId
  }
`;

const COLLECTION_FIELDS = gql`
  ${TASK_FIELDS}
  fragment CollectionFields on Collection {
    _id
    name
    color
    iconUrl
    isFavorite
    owner {
      _id
    }
    tasks {
      ...TaskFields
    }
  }
`;

// Mutations:
const REGISTER = gql`
  mutation register($input: CreateUserInput!) {
    register(input: $input) {
      message
    }
  }
`;

const LOGIN = gql`
  ${USER_FIELDS}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      data {
        user {
          ...UserFields
        }
        token
      }
      message
    }
  }
`;

const CREATE_COLLECTION = gql`
  ${COLLECTION_FIELDS}
  mutation createCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      data {
        collection {
          ...CollectionFields
        }
      }
      message
    }
  }
`;

const CREATE_TASK = gql`
  ${TASK_FIELDS}
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      data {
        task {
          ...TaskFields
        }
      }
      message
    }
  }
`;

const UPDATE_TASK = gql`
  ${TASK_FIELDS}
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      data {
        task {
          ...TaskFields
        }
      }
      message
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($input: TaskIDInput!) {
    deleteTask(input: $input) {
      message
    }
  }
`;

const DELETE_COLLECTION = gql`
  mutation deleteCollection($input: CollectionIDInput!) {
    deleteCollection(input: $input) {
      message
    }
  }
`;

const UPDATE_COLLECTION = gql`
  ${COLLECTION_FIELDS}
  mutation updateCollection($input: UpdateCollectionInput!) {
    updateCollection(input: $input) {
      data {
        collection {
          ...CollectionFields
        }
      }
      message
    }
  }
`;

const UPDATE_PASSWORD = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      message
    }
  }
`;

const UPDATE_ACCOUNT = gql`
  ${USER_FIELDS}
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      message
      data {
        ...UserFields
      }
    }
  }
`;

// Queries:
const ME = gql`
  ${USER_FIELDS}
  query {
    me {
      data {
        user {
          ...UserFields
        }
        token
      }
      message
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
  ${COLLECTION_FIELDS}
  query {
    getCollections {
      data {
        collections {
          ...CollectionFields
        }
      }
      message
    }
  }
`;

export const queries = {
  query: {
    ME,
    DEFAULT_ICONS,
    GET_COLLECTIONS,
  },
  mutation: {
    REGISTER,
    LOGIN,
    CREATE_COLLECTION,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    DELETE_COLLECTION,
    UPDATE_COLLECTION,
    UPDATE_PASSWORD,
    UPDATE_ACCOUNT,
  },
};
