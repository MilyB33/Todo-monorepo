import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { useMutation } from "@apollo/client";
import { useLocalStorage } from "./useLocalStorage";
import { queries } from "../clients/ApolloClient";
import { login, logout } from "../store/slices/authSlice";
import { clearCollections } from "../store/slices/userSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loginUser, { data, error, loading, client }] = useMutation(queries.mutation.LOGIN);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { setItem, removeItem } = useLocalStorage();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser({ variables: { input: { email, password } } });

      if (error) {
        console.error(error.message);
        return;
      }

      if (res) {
        const {
          login: {
            data: { token },
          },
        } = res.data;

        setItem("token", token);

        setTimeout(() => {
          // timeout to avoid instant redirect
          dispatch(login(res.data.login.data));
        }, 3000);
      } else {
        console.error("No data returned from login mutation");
      }
    } catch (e) {
      console.error(e);
    }
  };

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
