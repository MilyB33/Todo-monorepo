import React, { useState } from "react";
import { ITask } from "../../types";
import { Checkbox } from "primereact/checkbox";
import Typography from "../Typography";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { useAppDispatch } from "../../store/app/hooks";
import { replaceTask, removeTask } from "../../store/slices/userSlice";
import { BlockUI } from "primereact/blockui";
import { RiDeleteBin2Fill } from "react-icons/ri";
import moment from "moment";

interface PropTypes {
  task: ITask;
}

const Task = ({ task }: PropTypes) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(task.completed);
  const [updateTask, { loading }] = useMutation(queries.mutation.UPDATE_TASK, {
    onCompleted: (data) => {
      dispatch(replaceTask(data.updateTask.data.task));
    },
  });
  const [deleteTask, { loading: loadingDelete }] = useMutation(queries.mutation.DELETE_TASK, {
    onCompleted: (data) => {
      dispatch(removeTask({ taskId: task._id, collectionId: task.collectionId }));
    },
  });

  const handleComplete = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    try {
      await updateTask({
        variables: {
          input: {
            _id: task._id,
            completed: !checked,
          },
        },
      });
      setChecked(!checked);
    } catch (e) {
      console.log(e);
    }

    setChecked(!checked);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    try {
      await deleteTask({
        variables: {
          input: {
            _id: task._id,
          },
        },
      });
      dispatch(removeTask({ taskId: task._id, collectionId: task.collectionId }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BlockUI blocked={loading || loadingDelete}>
      <article
        className="tooltip flex items-center gap-5 bg-bluegray-900 p-5 hover:bg-blue-800 rounded cursor-pointer"
        onClick={handleComplete}
      >
        <Checkbox checked={checked} readOnly className="checkbox-task" />

        <div className={`${task.completed && "line-through"} grid gap-1`}>
          <Typography classNames="select-none">{task.description}</Typography>

          <Typography variant="h6">{moment().calendar(task.date)}</Typography>
        </div>

        <button
          onClick={handleDelete}
          id="delete"
          className="bg-defaults-error p-2 ml-auto rounded-full hover:bg-pink"
        >
          <RiDeleteBin2Fill className="text-red-500 pointer-events-none" />
        </button>
      </article>
    </BlockUI>
  );
};

export default Task;
