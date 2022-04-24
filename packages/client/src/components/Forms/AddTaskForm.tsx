import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Button from "../Buttons/Button";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import ToastMessage from "../Generic/ToastMessage";
import { useAppDispatch } from "../../store/app/hooks";
import { addTask } from "../../store/slices/userSlice";
import Calendar from "./Inputs/TaskInputs/Calendar";
import validationSchema from "../../utils/validation.schema";
import { useParams } from "react-router-dom";
import { useToastMessage } from "../../hooks/useToastMessage";

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

              createTask({
                variables: {
                  input: {
                    description,
                    date,
                    time,
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
              <div className="flex">
                <Field
                  name="date"
                  label="Date"
                  component={Calendar}
                  setFieldValue={props.setFieldValue}
                  placeholder="Enter date"
                  isIcon
                />

                <Field
                  name="time"
                  label="Time"
                  component={Calendar}
                  setFieldValue={props.setFieldValue}
                  placeholder="Enter time"
                  isTime
                  classNames="ml-auto"
                />
              </div>

              <Field
                name="description"
                label="Description"
                component={TextInput}
                placeholder="Enter description"
                classNames="mt-5 !w-full"
              />

              <Button
                label="Add"
                onClick={props.handleSubmit}
                type="submit"
                styles="bg-pink-300 mx-auto px-8 py-2 rounded-full transition-colors hover:bg-pink-400 mt-5"
                disabled={loading}
              />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddTaskForm;
