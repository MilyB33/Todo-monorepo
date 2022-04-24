import { Formik, Field } from "formik";
import TextInput from "../Inputs/AuthInputs/TextInput";
import Color from "../Inputs/CollectionInputs/Color";
import Select from "../Inputs/CollectionInputs/Select";
import Button from "../../Buttons/Button";
import CollectionOverview from "./CollectionOverview";
import { useMutation } from "@apollo/client";
import { trimWhitespaces } from "../../../utils/trimWhitespaces";
import { useAppSelector } from "../../../store/app/hooks";
import { DocumentNode } from "@apollo/client/core";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { useParams } from "react-router-dom";

interface IInput {
  _id?: string;
  name: string;
  color: string;
  iconUrl: string;
}

interface PropTypes {
  initialValues?: {
    name: string;
    color: string;
    icon: string;
  };
  onCompletedCallback: (data: any, callback: (message: string) => void) => void;
  query: DocumentNode;
  buttonText: string;
}

const CollectionFormTemplate = ({
  initialValues,
  query,
  onCompletedCallback,
  buttonText,
}: PropTypes) => {
  const params = useParams();
  const { handleSuccess, handleError } = useToastMessage();
  const { defaultIcons } = useAppSelector((state) => state.app);
  const [actionCollection, { loading }] = useMutation(query, {
    onCompleted: (data) => {
      onCompletedCallback(data, handleSuccess);
    },
    onError: (error) => {
      console.log(error.message);
      handleError(error.message);
    },
  });

  return (
    <>
      <div className="mx-5">
        <Formik
          initialValues={
            initialValues || {
              name: "New Collection",
              icon: defaultIcons[0].url || "",
              color: "ffffff",
            }
          }
          onSubmit={async (values) => {
            try {
              const trimmedValues = trimWhitespaces(values);

              const input = {
                name: trimmedValues.name,
                color: trimmedValues.color,
                iconUrl: trimmedValues.icon,
              } as IInput;

              if (params.collectionId) input._id = params.collectionId;

              actionCollection({
                variables: {
                  input,
                },
              });
            } catch (e) {
              console.log(e);
            }
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
                label={buttonText}
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

export default CollectionFormTemplate;
