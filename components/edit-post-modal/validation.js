import * as Yup from "yup";

const editPostSchema = Yup.object({
  text: Yup.string().required("Text content is required"),
});

export default editPostSchema;
