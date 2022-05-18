import Typography from "../Typography";
import LinkButton from "../Buttons/LinkButton";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface PropTypes {
  children: React.ReactNode | string;
  style?: string;
}

const DashboardHeader = ({ children, style }: PropTypes) => {
  return (
    <header className={`${style || ""} flex gap-5 items-center`}>
      <LinkButton to={"/dashboard"}>
        <AiOutlineArrowLeft className="text-xl" />
      </LinkButton>

      <Typography classNames="font-bold" variant="h2">
        {children}
      </Typography>
    </header>
  );
};

export default DashboardHeader;
