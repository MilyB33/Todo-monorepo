import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { useMutation } from "@apollo/client";
import { useToastMessage } from "./useToastMessage";
import { useLocalStorage } from "./useLocalStorage";
import { queries } from "../clients/ApolloClient";
import { login, logout } from "../store/slices/authSlice";
import { clearCollections } from "../store/slices/userSlice";

export const useAuth = () => {
  const { handleSuccess, handleError } = useToastMessage();
  const dispatch = useAppDispatch();
  const [loginUser, { data, error, loading, client }] = useMutation(queries.mutation.LOGIN, {
    onCompleted: (data) => {
      const {
        login: {
          data: { token },
        },
      } = data;

      setItem("token", token); // for now probably will be changed on server side to use cookie

      handleSuccess(data.login.message);

      dispatch(login(data.login.data));
    },
    onError: (error) => {
      console.log(error);
      handleError(error.message);
    },
  });

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { setItem, removeItem } = useLocalStorage();

  const handleLogin = (email: string, password: string) =>
    loginUser({ variables: { input: { email, password } } });

  const handleLogout = () => {
    removeItem("token");
    client.resetStore();
    dispatch(logout());
    dispatch(clearCollections());
  };

  return {
    isAuthenticated,
    user,
    query: { message: data?.login.message, error, loading },
    handleLogin,
    handleLogout,
  };
};
