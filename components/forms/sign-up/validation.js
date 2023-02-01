import * as Yup from "yup";

const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  name: Yup.string().trim().required("Full name is required"),
  password: Yup.string()
    .min(8, "min character")
    .matches(/(?=.*[a-z])/, "lowercase")
    .matches(/(?=.*[A-Z])/, "uppercase")
    .matches(/(?=.*[0-9])/, "number")
    .matches(/(?=.*[!@#\$%\^&\*])/, "special character")
    .required(true),
});

export default signUpSchema;
