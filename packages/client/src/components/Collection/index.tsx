import { Accordion, AccordionTab } from "primereact/accordion";
import AccordionHeader from "./AccordionHeader";
import AddTaskForm from "../Forms/AddTaskFrom";

const Collection = () => {
  return (
    <section className="w-2/4">
      <Accordion expandIcon="" collapseIcon="" className="!w-full">
        <AccordionTab headerClassName="!w-full" className="header" header={<AccordionHeader />}>
          <AddTaskForm />
        </AccordionTab>
      </Accordion>
    </section>
  );
};

export default Collection;
