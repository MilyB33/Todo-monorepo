import Typography from "../Typography";
import Collection from "../Collections/Collection";
import CollectionNavForm from "../Forms/CollectionNavForm";
import { Accordion, AccordionTab } from "primereact/accordion";

const Collections = () => {
  return (
    <aside className="flex flex-col gap-5 h-full min-w-[22rem] bg-gray-800 py-3 overflow-auto">
      <Typography classNames="p-3" variant="h4">
        Collections
      </Typography>

      <nav className="grid gap-5">
        <section>
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
        </section>
      </nav>

      <div className="grid gap-5">
        <Accordion className="!h-full">
          <AccordionTab header="Add Collection" contentClassName="!h-full">
            <CollectionNavForm />
          </AccordionTab>
        </Accordion>
      </div>
    </aside>
  );
};

export default Collections;
