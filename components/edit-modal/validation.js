import * as Yup from "yup";

const editProfileSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
});

export default editProfileSchema;
