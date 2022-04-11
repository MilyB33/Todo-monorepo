import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Button from "../Buttons/Button";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { trimWhitespaces } from "../../utils/trimWhitespaces";
import { useAuth } from "../../hooks/useAuth";
import ToastMessage from "../Generic/ToastMessage";
import { useAppSelector, useAppDispatch } from "../../store/app/hooks";
import { addCollection } from "../../store/slices/userSlice";
import Calendar from "./Inputs/TaskInputs/Calendar";

const AddTaskForm = () => {
  const dispatch = useAppDispatch();
  const { defaultIcons } = useAppSelector((state) => state.app);
  const { user } = useAuth();
  const [createCollection, { data, loading, error }] = useMutation(
    queries.mutation.CREATE_COLLECTION,
    {
      onCompleted: (data) => {
        dispatch(addCollection(data.createCollection.data.collection));
      },
    }
  );

  return (
    <>
      <ToastMessage
        type={Boolean(error) ? "error" : "success"}
        message={Boolean(error) ? error?.message : data?.createCollection.message}
      />

      <div className="mx-5">
        <Formik
          initialValues={{
            name: "New Collection",
            icon: defaultIcons[0].url || "",
            color: "ffffff",
          }}
          onSubmit={(values) => {}}
        >
          {(props) => (
            <form className="flex flex-col">
              <Field
                name="date"
                label="Date"
                component={Calendar}
                setFieldValue={props.setFieldValue}
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
