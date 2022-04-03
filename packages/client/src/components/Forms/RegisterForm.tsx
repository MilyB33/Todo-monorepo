import { Formik, Field } from "formik";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Password from "./Inputs/AuthInputs/Password";
import SubmitButton from "../Generic/SubmitButton";
import validationSchema from "../../utils/validation.schema";
import { isEveryTouched } from "../../utils/isEveryTouched";
import AuthWrapper from "./Templates/AuthWrapper";
import WithConfig from "../../hoc/WithConfig";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { trimWhitespaces } from "../../utils/trimWhitespaces";

const config = {
  classNames: "text-input",
  labelColor: "text-blue",
};

const TextInputWithConfig = WithConfig(TextInput, config);

const PasswordWithConfig = WithConfig(Password, config);

const initialValues = {
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const [signUp, { loading, error }] = useMutation(queries.mutation.CREATE_USER);

  return (
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
        onSubmit={async (values) => {
          try {
            const trimmedValues = trimWhitespaces(values);
            delete trimmedValues.confirmPassword;

            await signUp({ variables: trimmedValues });

            if (error) {
              console.log(error);
            }
          } catch (err) {}
        }}
      >
        {(props) => (
          <form className="grid gap-3 lg:w-2/4">
            <Field
              name="username"
              label="Username"
              component={TextInputWithConfig}
              setFieldValue={props.setFieldValue}
              placeholder="Enter your username"
              icon="pi pi-id-card"
            />

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
  );
};

export default RegisterForm;
