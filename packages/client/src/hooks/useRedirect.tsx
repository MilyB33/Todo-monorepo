import { useNavigate } from "react-router-dom";

interface IOptions {
  to?: string;
  timeout?: number;
}

export const useRedirect = (options: IOptions) => {
  const navigate = useNavigate();
  const { to = "/", timeout = 2000 } = options;

  const timeoutRedirect = () => {
    setTimeout(() => {
      navigate(to);
    }, timeout);
  };

  const redirect = () => navigate(to);

  return { timeoutRedirect, redirect };
};
