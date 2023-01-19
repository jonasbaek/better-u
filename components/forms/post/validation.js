import * as Yup from "yup";

const postSchema = Yup.object({
  text: Yup.string().required("Empty field"),
});

export default postSchema;
