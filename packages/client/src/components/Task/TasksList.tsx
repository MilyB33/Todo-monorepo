import { ITask } from "../../types";
import Task from "./Task";
import Typography from "../Typography";

interface PropTypes {
  tasks: ITask[];
  header: string;
}

const TasksList = ({ tasks, header }: PropTypes) => {
  return (
    <div className="!w-full mt-5">
      <Typography>{`${header} - ${tasks.length}`}</Typography>

      <div className="mt-5 grid gap-2">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
