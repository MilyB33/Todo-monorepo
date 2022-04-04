import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { useMutation } from "@apollo/client";
import { useLocalStorage } from "./useLocalStorage";
import { queries } from "../clients/ApolloClient";
import { login, logout } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loginUser, { data, error, loading }] = useMutation(queries.mutation.LOGIN);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { setItem, removeItem } = useLocalStorage();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser({ variables: { input: { email, password } } });

      if (error) {
        console.error(error.message);
        return;
      }

      console.log(res.data.login);

      if (res) {
        const {
          login: { token },
        } = res.data;

        setItem("token", token);

        setTimeout(() => {
          // timeout to avoid instant redirect
          dispatch(login(res.data.login));
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
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    query: { message: data?.login.message, error, loading },
    handleLogin,
    handleLogout,
  };
};
