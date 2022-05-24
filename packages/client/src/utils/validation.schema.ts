import * as Yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const minLog = (min: number, label: string) => `${label} must be at least ${min} characters`;

const maxLog = (max: number, label: string) => `${label} must be less than ${max} characters`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(3, minLog(3, "Email"))
    .max(50, maxLog(50, "Email"))
    .required("Email is required"),
  password: Yup.string()
    .min(8, minLog(8, "Password"))
    .max(50, maxLog(50, "Password"))
    .required("Required"),
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3, minLog(3, "Name")).max(50, maxLog(50, "Name")).required("Required"),
  surname: Yup.string()
    .min(3, minLog(3, "Surname"))
    .max(50, maxLog(50, "Surname"))
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .min(3, minLog(3, "Email"))
    .max(50, maxLog(50, "Email"))
    .required("Required"),
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

const UpdatePassowrdSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, minLog(8, "Password"))
    .max(50, maxLog(50, "Password"))
    .required("Required"),
  newPassword: Yup.string()
    .min(8, minLog(8, "Password"))
    .max(50, maxLog(50, "Password"))
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

const TaskSchema = Yup.object().shape({
  description: Yup.string()
    .min(3, minLog(3, "Description"))
    .max(50, maxLog(50, "Description"))
    .required("Required"),
  date: Yup.date()
    .required("Required")
    .typeError("Invalid date")
    .min(new Date(), "Date must be in the future"),
  time: Yup.date()
    .required("Required")
    .typeError("Invalid time")
    .min(new Date(), "Time must be in the future"),
});

const DisplayNameSchema = Yup.object().shape({
  name: Yup.string().min(3, minLog(3, "Name")).max(50, maxLog(50, "Name")).required("Required"),
  surname: Yup.string()
    .min(3, minLog(3, "Surname"))
    .max(50, maxLog(50, "Surname"))
    .required("Required"),
});

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(3, minLog(3, "Email"))
    .max(50, maxLog(50, "Email"))
    .required("Required"),
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(3, minLog(3, "Email"))
    .max(50, maxLog(50, "Email"))
    .required("Required"),
  password: Yup.string()
    .min(8, minLog(8, "Password"))
    .max(50, maxLog(50, "Password"))
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default {
  LoginSchema,
  RegisterSchema,
  TaskSchema,
  UpdatePassowrdSchema,
  DisplayNameSchema,
  EmailSchema,
  ForgotPasswordSchema,
};
