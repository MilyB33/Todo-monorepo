import Typography from "../Typography";
import { AiOutlinePlus } from "react-icons/ai";

const AccordionHeader = () => {
  return (
    <section className="flex items-center gap-3 p-2 text-xl">
      <div className="p-1 bg-text-pink rounded">
        <AiOutlinePlus />
      </div>

      <Typography>Add a task</Typography>
    </section>
  );
};

export default AccordionHeader;
