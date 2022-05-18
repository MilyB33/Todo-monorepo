import { Link, LinkProps } from "react-router-dom";

interface PropTypes {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  defaultStyles?: boolean;
  to: LinkProps["to"];
}

const LinkButton = ({ children, defaultStyles = true, to, label, className }: PropTypes) => {
  return (
    <>
      <Link to={to} className={`${defaultStyles && "button"} ${className}`}>
        {children || label}
      </Link>
    </>
  );
};

export default LinkButton;
