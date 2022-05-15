import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Password from "./Inputs/AuthInputs/Password";
import SubmitButton from "../Buttons/SubmitButton";
import validationSchema from "../../utils/validation.schema";
import { isEveryTouched } from "../../utils/isEveryTouched";
import AuthWrapper from "./Templates/AuthWrapper";
import WithConfig from "../../hoc/WithConfig";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { trimWhitespaces } from "../../utils/trimWhitespaces";
import { useRedirect } from "../../hooks/useRedirect";
import { useToastMessage } from "../../hooks/useToastMessage";

const config = {
  classNames: "text-input",
  labelColor: "text-blue",
};

const TextInputWithConfig = WithConfig(TextInput, config);

const PasswordWithConfig = WithConfig(Password, config);

const initialValues = {
  name: "",
  surname: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const { handleSuccess, handleError } = useToastMessage();

  const [signUp, { loading }] = useMutation(queries.mutation.REGISTER, {
    onCompleted: (data) => {
      handleSuccess(data.register.message);
      timeoutRedirect();
    },
    onError: (error) => {
      console.error(error.message);
      handleError(error.message);
    },
  });
  const { timeoutRedirect } = useRedirect({
    to: "/",
    timeout: 2000,
  });

  return (
    <>
      <AuthWrapper
        header={{
          pink: "Sign",
          blue: "up",
        }}
        bottom={{
          text: "Already have an account?",
          linkText: "Log in",
          to: "/login",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema.RegisterSchema}
          onSubmit={(values) => {
            try {
              const trimmedValues = trimWhitespaces(values);
              delete trimmedValues.confirmPassword;

              signUp({ variables: { input: trimmedValues } });
            } catch (err: any) {
              console.error(err.message);
            }
          }}
        >
          {(props) => (
            <form className="grid gap-3 lg:w-3/4">
              <span className="flex gap-2">
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
              </span>

              <Field
                name="email"
                label="E-mail"
                component={TextInputWithConfig}
                setFieldValue={props.setFieldValue}
                placeholder="Enter your e-mail"
                icon="pi pi-id-card"
              />

              <Field
                name="password"
                label="Password"
                component={PasswordWithConfig}
                setFieldValue={props.setFieldValue}
                placeholder="Enter your password"
              />

              <Field
                name="confirmPassword"
                label="Confirm Password"
                component={PasswordWithConfig}
                setFieldValue={props.setFieldValue}
                placeholder="Confirm your password"
              />

              <SubmitButton
                disabled={!isEveryTouched(props.touched) || !props.isValid}
                label="Sign up"
                onSubmit={props.handleSubmit}
                loading={loading}
              />
            </form>
          )}
        </Formik>
      </AuthWrapper>
    </>
  );
};

export default RegisterForm;
