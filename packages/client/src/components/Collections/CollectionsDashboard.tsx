import { useAppSelector } from "../../store/app/hooks";
import { Accordion, AccordionTab } from "primereact/accordion";
import Task from "../Task/Task";
import DashboardAccordionHeader from "../Header/DashboardAccordionHeader";
import { selectDashboardCollections } from "../../store/slices/collectionsSlice";
import LinkButton from "../Buttons/LinkButton";

const CollectionsDashboard = () => {
  const collections = useAppSelector(selectDashboardCollections);

  return (
    <Accordion
      className="!w-[30vw] min-w-[300px] grid gap-5"
      expandIcon=""
      collapseIcon=""
      activeIndex={0}
    >
      {collections.slice(0, 2).map((collection) => (
        <AccordionTab
          key={collection._id}
          contentClassName="!border-pink-300"
          header={<DashboardAccordionHeader name={collection.name} />}
          headerTemplate={<DashboardAccordionHeader name={collection.name} />}
        >
          {collection.tasks.slice(0, 3).map((task) => (
            <Task key={task._id} task={task} />
          ))}
          <LinkButton
            label="See more"
            className="mt-3 w-full bg-blue"
            to={`/collections/${collection._id}`}
          />
        </AccordionTab>
      ))}
    </Accordion>
  );
};

export default CollectionsDashboard;
