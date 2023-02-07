import { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FormHelperText from "@mui/material/FormHelperText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import editProfileSchema from "./validation";
import { useForm } from "react-hook-form";

export default function EditModal(props) {
  const [open, setOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const [previewImage, setPreviewImage] = useState();
  const fileInput = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue("name", props.currentUser?.name);
    setValue("description", props.currentUser.description);
    setImageUpload("");
    setPreviewImage("");
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    let form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    if (imageUpload) {
      form.append("image", imageUpload);
    }
    setImageUpload("");
    await props.updateUser(
      props.currentUser._id,
      form,
      props.currentUserFetch,
      props.postsFetch
    );
    if (props.refreshData) props.refreshData();
    setOpen(false);
  };

  useEffect(() => {
    if (!imageUpload) {
      setPreviewImage("");
      return;
    }
    const objectUrl = URL.createObjectURL(imageUpload);
    setPreviewImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageUpload]);

  useEffect(() => {
    setValue("name", props.currentUser?.name);
    setValue("description", props.currentUser?.description);
  }, []);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <ManageAccountsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">Edit your profile</DialogTitle>
        <DialogContent>
          <form
            className="form d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl
              className="mt-4"
              error={errors.name}
              variant="standard"
            >
              <InputLabel htmlFor="signUpName">Name</InputLabel>
              <Input
                id="signUpName"
                {...register("name")}
                onChange={(e) => {
                  setValue("name", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={(e) => {
                  setValue("name", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {errors.name?.message}
              </FormHelperText>
            </FormControl>
            <FormControl className="mt-4" variant="standard">
              <InputLabel htmlFor="editDescription">Description</InputLabel>
              <Input
                inputProps={{ maxLength: 80 }}
                multiline={true}
                rows={4}
                maxLength="200"
                sx={{ alignItems: "baseline" }}
                id="editDescription"
                {...register("description")}
                onChange={(e) => {
                  setValue("description", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={(e) => {
                  setValue("description", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <PostAddIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className="mt-4" variant="standard">
              <Avatar
                className="m-auto position-relative"
                sx={{
                  width: 200,
                  height: 200,
                }}
              >
                {(!!props.currentUser?.avatar || previewImage) && (
                  <Image
                    src={
                      previewImage
                        ? previewImage
                        : `${process.env.NEXT_PUBLIC_API_URL}/public/uploads/avatars/${props.currentUser?.avatar}`
                    }
                    className="text-center"
                    alt="Profile photo"
                    fill
                  />
                )}
              </Avatar>
              <IconButton
                className="position-absolute bg-light bottom-0 ms-5"
                onClick={() => handleClick()}
              >
                <PhotoCameraIcon />
              </IconButton>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                className="d-none"
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    setImageUpload("");
                    return;
                  }
                  setImageUpload(e.target.files[0]);
                  e.target.value = "";
                }}
                ref={(e) => {
                  fileInput.current = e;
                }}
              />
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
