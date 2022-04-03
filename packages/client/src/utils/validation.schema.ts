import * as Yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const minLog = (min: number, label: string) => `${label} must be at least ${min} characters`;

const maxLog = (max: number, label: string) => `${label} must be less than ${max} characters`;

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, minLog(3, "Username"))
    .max(50, maxLog(50, "Username"))
    .required("Username is required"),
  password: Yup.string()
    .min(8, minLog(8, "Password"))
    .max(50, maxLog(50, "Password"))
    .required("Required"),
});

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, minLog(3, "Username"))
    .max(50, maxLog(50, "Username"))
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, minLog(4, "Password"))
    .max(50, maxLog(50, "Password"))
    .matches(
      PASSWORD_REGEX,
      "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default { LoginSchema, RegisterSchema };
