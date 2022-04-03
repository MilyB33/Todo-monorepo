import { Link } from "react-router-dom";

interface IPropTypes {
  to: string;
  text: string;
}

const SubPageButton = ({ to, text }: IPropTypes) => {
  return (
    <Link to={to} className="p-3 bg-text-pink rounded-full">
      {text}
    </Link>
  );
};

export default SubPageButton;
