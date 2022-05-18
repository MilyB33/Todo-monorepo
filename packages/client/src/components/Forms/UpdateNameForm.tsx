import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Button from "../Buttons/Button";
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
  name: "",
  surname: "",
};

const UpdateNameForm = () => {
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
        validationSchema={validationSchema.DisplayNameSchema}
        onSubmit={(values, { resetForm }) => {
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

            resetForm();
          } catch (err: any) {
            console.error(err.message);
          }
        }}
      >
        {(props) => (
          <form className="grid">
            <Field
              name="name"
              label="Name"
              component={TextInputWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Enter your Name"
            />

            <Field
              name="surname"
              label="Surname"
              component={TextInputWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Enter your Surname"
            />

            <Button
              disabled={!isEveryTouched(props.touched) || !props.isValid}
              label="Update"
              type="submit"
              onClick={props.handleSubmit}
              loading={loading}
              className="btn-submit"
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default UpdateNameForm;
