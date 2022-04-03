import { Link } from "react-router-dom";

interface IPropTypes {
  children: React.ReactNode | string;
  color?: string;
  to?: string;
}

const ActionButton = ({ children, color, to, ...props }: IPropTypes) => {
  return (
    <Link
      to={to || "/"}
      {...props}
      className={`${color} p-2 rounded-sm relative opacity-80 hover:opacity-100 transition-opacity duration-300`}
    >
      {children}
    </Link>
  );
};

export default ActionButton;
