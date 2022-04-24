import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import SubmitButton from "../Buttons/SubmitButton";
import validationSchema from "../../utils/validation.schema";
import { isEveryTouched } from "../../utils/isEveryTouched";
import WithConfig from "../../hoc/WithConfig";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { trimWhitespaces } from "../../utils/trimWhitespaces";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useAppDispatch } from "../../store/app/hooks";
import { updateAccount } from "../../store/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";

const config = {
  classNames: "text-input",
  labelColor: "text-blue",
};

const TextInputWithConfig = WithConfig(TextInput, config);

const initialValues = {
  email: "",
};

const UpdateEmailForm = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { handleSuccess, handleError } = useToastMessage();

  const [updateUser, { loading }] = useMutation(queries.mutation.UPDATE_ACCOUNT, {
    onCompleted: (data) => {
      dispatch(updateAccount(data.updateUser.data));
      handleSuccess(data.updateUser.message);
    },
    onError: (error) => {
      console.error(error.message);
      handleError(error.message);
    },
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema.EmailSchema}
        onSubmit={(values) => {
          try {
            const trimmedValues = trimWhitespaces(values);
            delete trimmedValues.confirmPassword;

            updateUser({
              variables: {
                input: {
                  ...trimmedValues,
                  _id: user._id,
                },
              },
            });
          } catch (err: any) {
            console.error(err.message);
          }
        }}
      >
        {(props) => (
          <form className="grid">
            <Field
              name="email"
              label="Email"
              component={TextInputWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Enter new Email"
            />

            <SubmitButton
              disabled={!isEveryTouched(props.touched) || !props.isValid}
              label="Update"
              onSubmit={props.handleSubmit}
              loading={loading}
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default UpdateEmailForm;
