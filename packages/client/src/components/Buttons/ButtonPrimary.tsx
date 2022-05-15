import { Link } from "react-router-dom";
import Typography from "../Typography";

interface PropTypes {
  text: string;
  style?: string;
  variant?: "button" | "link";
  to?: string;
  defaultStyles?: boolean;
  onClick?: () => void;
}

const PrimaryButton = ({
  text,
  style,
  defaultStyles = true,
  variant = "button",
  to,
  onClick,
  ...props
}: PropTypes) => {
  switch (variant) {
    case "button":
      return (
        <button onClick={onClick} className={`${defaultStyles && "button"} ${style}`}>
          <Typography>{text}</Typography>
        </button>
      );

    case "link":
      return (
        <Link to={to || "/"} {...props} className={`${defaultStyles && "button"}  ${style}`}>
          <Typography>{text}</Typography>
        </Link>
      );
    default:
      return (
        <button onClick={onClick} className={`${defaultStyles && "button"} ${style}`}>
          <Typography>{text}</Typography>
        </button>
      );
  }
};

export default PrimaryButton;
