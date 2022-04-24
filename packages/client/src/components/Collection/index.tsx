import { Accordion, AccordionTab } from "primereact/accordion";
import AccordionHeader from "./AccordionHeader";
import AddTaskForm from "../Forms/AddTaskForm";
import { useAppSelector } from "../../store/app/hooks";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../store/slices/userSlice";
import TasksList from "../Task/TasksList";
import { ScrollPanel } from "primereact/scrollpanel";
import { Dialog } from "primereact/dialog";
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
    <section className="max-h-[80vh] ">
      <ScrollPanel style={{ width: "100%", height: "80vh" }}>
        <Accordion expandIcon="" collapseIcon="" className="!w-full">
          <AccordionTab headerClassName="!w-full" className="header" header={<AccordionHeader />}>
            <AddTaskForm />
          </AccordionTab>
        </Accordion>

        <TasksList header="Tasks" tasks={tasks} />

        <TasksList header="Completed" tasks={tasksCompleted} />
      </ScrollPanel>

      <Dialog
        header="Edit Collection"
        visible={showDialog}
        style={{ width: "30vw" }}
        modal={true}
        onHide={onHide}
      >
        <EditCollectionForm />
      </Dialog>
    </section>
  );
};

export default Collection;
