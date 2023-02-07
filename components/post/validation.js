import * as Yup from "yup";

const postCommentSchema = Yup.object({
  text: Yup.string().required("Comment is required"),
});

export default postCommentSchema;
