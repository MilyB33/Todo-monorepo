import { useAuth } from "../../hooks/useAuth";
import { Formik, Field } from "formik";
import Typography from "../Typography";
import TextInput from "./Inputs/AuthInputs/TextInput";
import Password from "./Inputs/AuthInputs/Password";
import Checkbox from "./Inputs/AuthInputs/Checkbox";
import Button from "../Buttons/Button";
import validationSchema from "../../utils/validation.schema";
import { isEveryTouched } from "../../utils/isEveryTouched";
import { Link } from "react-router-dom";
import AuthWrapper from "./Templates/AuthWrapper";
import WithConfig from "../../hoc/WithConfig";
import { trimWhitespaces } from "../../utils/trimWhitespaces";

const config = {
  classNames: "text-input",
  labelColor: "text-blue",
};

const TextInputWithConfig = WithConfig(TextInput, config);

const PasswordWithConfig = WithConfig(Password, config);

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const LoginForm = () => {
  const {
    query: { loading },
    handleLogin,
  } = useAuth();

  return (
    <>
      <AuthWrapper
        header={{
          pink: "Log",
          blue: "in",
        }}
        bottom={{
          text: "Don't have an account?",
          linkText: "Sign up",
          to: "/register",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema.LoginSchema}
          onSubmit={(values) => {
            try {
              const trimmedValues = trimWhitespaces(values);

              handleLogin(trimmedValues.email, trimmedValues.password);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {(props) => (
            <form className="grid gap-3 xl:w-2/4">
              <Field
                name="email"
                label="Email"
                component={TextInputWithConfig}
                setFieldValue={props.setFieldValue}
                placeholder="Enter your Email"
                icon="pi pi-id-card"
              />

              <Field
                name="password"
                label="Password"
                component={PasswordWithConfig}
                setFieldValue={props.setFieldValue}
                placeholder="Enter your password"
              />

              <div className="flex items-center gap-5 mt-5">
                <Field
                  name="remember"
                  label="Remember me"
                  component={Checkbox}
                  setFieldValue={props.setFieldValue}
                />

                <Link to="/forgot-password" className="text-blue ml-auto hover:underline">
                  <Typography>Forgot Password?</Typography>
                </Link>
              </div>

              <Button
                loading={loading}
                disabled={!props.isValid || !isEveryTouched(props.touched)}
                label="Log in"
                type="submit"
                onClick={props.handleSubmit}
                className="btn-submit"
              />
            </form>
          )}
        </Formik>
      </AuthWrapper>
    </>
  );
};

export default LoginForm;
