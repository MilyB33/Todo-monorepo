import { Link } from "react-router-dom";

interface IPropTypes {
  classNames?: string;
  children: string;
  to: string;
}

const AuthButton = ({ classNames, children, to }: IPropTypes) => {
  return (
    <Link
      to={to}
      className={`flex items-center transition-all ease-in-out duration-300 py-1 px-4 ${
        classNames || ""
      }`}
    >
      {children}
    </Link>
  );
};

export default AuthButton;
