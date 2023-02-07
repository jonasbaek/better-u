import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import editProfileSchema from "./validation";
import { useForm } from "react-hook-form";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import styles from "../../styles/styles.module.scss";

export default function EditPostModal(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  const handleClose = () => {
    setValue("text", props.post.text);
    props.setOpenModal(false);
  };

  const onSubmit = async (formData) => {
    await props.updatePostService(props.post.id, formData);
    props.setOpenModal(false);
  };

  useEffect(() => {
    setValue("text", props.post.text);
  }, [props.post]);

  return (
    <div>
      <Dialog open={props.openModal} onClose={handleClose}>
        <DialogTitle className="text-center">Edit your post</DialogTitle>
        <DialogContent>
          <form
            className="form d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl className="mt-4">
              <TextareaAutosize
                maxLength="2000"
                maxRows={10}
                className={styles.editPostText}
                {...register("text")}
                onChange={(e) => {
                  setValue("text", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={(e) => {
                  setValue("text", e.target.value, {
                    shouldValidate: true,
                  });
                }}
              />
              <FormHelperText id="component-error-text" className="text-danger">
                {errors.text?.message}
              </FormHelperText>
            </FormControl>
            <DialogActions className="mt-5">
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
