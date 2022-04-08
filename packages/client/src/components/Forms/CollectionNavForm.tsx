import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Color from "./Inputs/CollectionInputs/Color";
import Select from "./Inputs/CollectionInputs/Select";
import Typography from "../Typography";
import Button from "../Buttons/Button";
import CollectionOverview from "./Templates/CollectionOverview";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { trimWhitespaces } from "../../utils/trimWhitespaces";
import { useAuth } from "../../hooks/useAuth";
import ToastMessage from "../Generic/ToastMessage";
import { useAppSelector } from "../../store/app/hooks";

const CollectionNavForm = () => {
  const { defaultIcons } = useAppSelector((state) => state.app);
  const { user } = useAuth();
  const [createCollection, { data, loading, error }] = useMutation(
    queries.mutation.CREATE_COLLECTION
  );

  return (
    <>
      <ToastMessage
        type={Boolean(error) ? "error" : "success"}
        message={Boolean(error) ? error?.message : data?.createCollection.message}
      />

      <div className="mx-5">
        <Typography classNames="p-3 text-center" variant="h4">
          Add Collection
        </Typography>

        <Formik
          initialValues={{
            name: "New Collection",
            icon: defaultIcons[0].url || "",
            color: "ffffff",
          }}
          onSubmit={(values) => {
            const trimmedValues = trimWhitespaces(values);

            createCollection({
              variables: {
                input: {
                  name: trimmedValues.name,
                  color: trimmedValues.color,
                  iconUrl: trimmedValues.icon,
                  owner: user._id,
                },
              },
            });
          }}
        >
          {(props) => (
            <form className="flex flex-col">
              <Field
                name="name"
                label="Collection Name"
                placeholder="Enter collection name"
                icon="pi pi-user"
                component={TextInput}
              />

              <div className="flex justify-between">
                <Field
                  name="color"
                  label="Color"
                  placeholder="Enter collection color"
                  component={Color}
                />
                <Field
                  name="icon"
                  label="Icon"
                  placeholder="Enter collection icon"
                  component={Select}
                />
              </div>

              <div>
                <CollectionOverview
                  icon={props.values.icon}
                  label={props.values.name}
                  color={props.values.color}
                />
              </div>

              <Button
                label="Add"
                onClick={props.handleSubmit}
                type="submit"
                styles="bg-pink-300 mx-auto px-8 py-2 rounded-full transition-colors hover:bg-pink-400 mt-5"
              />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CollectionNavForm;
