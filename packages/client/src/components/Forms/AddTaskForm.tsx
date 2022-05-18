import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Button from "../Buttons/Button";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { useAppDispatch } from "../../store/app/hooks";
import { addTask } from "../../store/slices/userSlice";
import Calendar from "./Inputs/TaskInputs/Calendar";
import validationSchema from "../../utils/validation.schema";
import { useParams } from "react-router-dom";
import { useToastMessage } from "../../hooks/useToastMessage";
import moment from "moment";

const initialValues = {
  description: "",
  date: new Date(),
  time: new Date(),
};

const AddTaskForm = () => {
  const { handleError, handleSuccess } = useToastMessage();
  const { collectionId } = useParams();
  const dispatch = useAppDispatch();
  const [createTask, { data, loading, error }] = useMutation(queries.mutation.CREATE_TASK, {
    onCompleted: (data) => {
      handleSuccess(data.createTask.message);
      dispatch(addTask(data.createTask.data.task));
    },
    onError: (error) => {
      console.log(error.message);
      handleError(error.message);
    },
  });

  return (
    <>
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            try {
              const { description, date, time } = values;

              const dateTime = moment(date).set({
                hour: time.getHours(),
                minute: time.getMinutes(),
                second: time.getSeconds(),
              });

              createTask({
                variables: {
                  input: {
                    description,
                    date: dateTime,
                    collectionId,
                  },
                },
              });
            } catch (e) {
              console.log(e);
            }
          }}
          validationSchema={validationSchema.TaskSchema}
        >
          {(props) => (
            <form className="flex flex-col font-bold">
              <div className="flex gap-2 justify-between sm:justify-start">
                <Field
                  name="date"
                  label="Date"
                  component={Calendar}
                  setFieldValue={props.setFieldValue}
                  placeholder="Enter date"
                  classNames="task-input"
                />

                <Field
                  name="time"
                  label="Time"
                  component={Calendar}
                  setFieldValue={props.setFieldValue}
                  placeholder="Enter time"
                  classNames="task-input"
                  isTime
                />
              </div>

              <Field
                name="description"
                label="Description"
                component={TextInput}
                placeholder="Enter description"
                classNames="task-input"
              />

              <Button
                label="Add"
                onClick={props.handleSubmit}
                type="submit"
                className="bg-pink-300 mx-auto px-8 py-2 rounded-full transition-colors hover:bg-pink-400 mt-5"
                loading={loading}
              />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddTaskForm;
