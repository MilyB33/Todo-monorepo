import { Accordion, AccordionTab } from "primereact/accordion";
import AccordionHeader from "./AccordionHeader";
import AddTaskForm from "../Forms/AddTaskForm";
import { useAppSelector } from "../../store/app/hooks";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../store/slices/collectionsSlice";
import TasksList from "../Task/TasksList";
import CollectionDialog from "../Dialogs/CollectionDialog";
import EditCollectionForm from "../Forms/EditCollectionForm";

interface PropTypes {
  showDialog: boolean;
  onHide: () => void;
}

const Collection = ({ showDialog, onHide }: PropTypes) => {
  const { collectionId } = useParams();
  const collection = useAppSelector(selectCollection)(collectionId!)!;

  const tasks = collection?.tasks.filter((task) => !task.completed);
  const tasksCompleted = collection?.tasks.filter((task) => task.completed);

  return (
    <section>
      <Accordion expandIcon="" collapseIcon="" className="!w-full">
        <AccordionTab headerClassName="!w-full" className="header" header={<AccordionHeader />}>
          <AddTaskForm />
        </AccordionTab>
      </Accordion>

      <TasksList header="Tasks" tasks={tasks} />

      <TasksList header="Completed" tasks={tasksCompleted} />

      <CollectionDialog
        header="Edit Collection"
        visible={showDialog}
        modal={true}
        onHide={onHide}
        keepInViewport
      >
        <EditCollectionForm />
      </CollectionDialog>
    </section>
  );
};

export default Collection;
