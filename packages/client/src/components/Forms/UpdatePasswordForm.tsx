import { Formik, Field } from "formik";
import Password from "./Inputs/AuthInputs/Password";
import Button from "../Buttons/Button";
import validationSchema from "../../utils/validation.schema";
import { isEveryTouched } from "../../utils/isEveryTouched";
import WithConfig from "../../hoc/WithConfig";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { trimWhitespaces } from "../../utils/trimWhitespaces";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useAuth } from "../../hooks/useAuth";

const config = {
  classNames: "text-input ",
  labelColor: "text-text",
};

const PasswordWithConfig = WithConfig(Password, config);

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const UpdatePasswordForm = () => {
  const { user } = useAuth();
  const { handleSuccess, handleError } = useToastMessage();

  const [signUp, { loading }] = useMutation(queries.mutation.UPDATE_PASSWORD, {
    onCompleted: (data) => {
      handleSuccess(data.updatePassword.message);
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
        validationSchema={validationSchema.UpdatePassowrdSchema}
        onSubmit={(values) => {
          try {
            const trimmedValues = trimWhitespaces(values);
            delete trimmedValues.confirmPassword;

            signUp({
              variables: {
                input: {
                  _id: user._id,
                  password: trimmedValues.oldPassword,
                  newPassword: trimmedValues.newPassword,
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
              name="oldPassword"
              label="Old Password"
              component={PasswordWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Enter your password"
            />
            <Field
              name="newPassword"
              label="New Password"
              component={PasswordWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Enter new password"
            />

            <Field
              name="confirmPassword"
              label="Confirm Password"
              component={PasswordWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Confirm your new password"
            />

            <Button
              disabled={!isEveryTouched(props.touched) || !props.isValid}
              label="Change"
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

export default UpdatePasswordForm;
