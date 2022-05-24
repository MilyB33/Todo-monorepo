import Typography from "../Typography";
import { AiOutlinePlus } from "react-icons/ai";

interface PropTypes {
  name: string;
}

const DashboardAccordionHeader = ({ name }: PropTypes) => {
  return (
    <header className="flex items-center gap-3 p-2 text-xl">
      <div className="p-1 bg-text-pink rounded">
        <AiOutlinePlus />
      </div>

      <Typography>{name}</Typography>
    </header>
  );
};

export default DashboardAccordionHeader;
