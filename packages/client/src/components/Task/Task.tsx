import React, { useState, useMemo } from "react";
import { ITask } from "../../types";
import { Checkbox } from "primereact/checkbox";
import Typography from "../Typography";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { useAppDispatch } from "../../store/app/hooks";
import { replaceTask, removeTask } from "../../store/slices/userSlice";
import { BlockUI } from "primereact/blockui";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import moment from "moment";
import { formatDate } from "../../utils/formatDate";

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
    onCompleted: () => {
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

  const handleDelete = async () => {
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

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    confirmDialog({
      message: "Are you sure you want to delete this task?",
      header: "Delete Task",
      acceptLabel: "Delete",
      rejectLabel: "Cancel",
      accept: handleDelete,
      reject: () => {
        console.log("Rejected");
      },
    });
  };

  const isOverdue = moment(task.date).isBefore(moment());
  const isNear = moment(task.date).isSame(moment(), "day");

  console.log(isNear);
  return (
    <BlockUI blocked={loading || loadingDelete}>
      <article
        className={`tooltip flex items-center gap-5 bg-bluegray-900 p-5 hover:bg-blue-800 rounded cursor-pointer border-b-2 ${
          isOverdue
            ? "border-defaults-error"
            : isNear
            ? "border-defaults-warning"
            : "border-defaults-success"
        } `}
        onClick={handleComplete}
      >
        <Checkbox checked={checked} readOnly className="checkbox-task" />

        <div className={`${task.completed && "line-through"} grid gap-1`}>
          <Typography classNames="select-none">{task.description}</Typography>

          <Typography variant="h6">{formatDate(task.date)}</Typography>
        </div>

        <button
          onClick={confirm}
          id="delete"
          className="bg-defaults-error p-2 ml-auto rounded-full hover:bg-pink"
        >
          <RiDeleteBin2Fill className="text-red-500 pointer-events-none" />
        </button>
      </article>
      <ConfirmDialog />
    </BlockUI>
  );
};

export default Task;
