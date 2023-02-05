import Image from "next/image";
import AvatarComponent from "../avatar";
import postSchema from "./validation";
import styles from "../../styles/styles.module.scss";
import { IconButton, InputBase } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function PostStatus(props) {
  const [imageUpload, setImageUpload] = useState();
  const [previewImage, setPreviewImage] = useState();
  const fileInput = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (formData) => {
    let form = new FormData();
    form.append("text", formData.text);
    if (imageUpload) {
      form.append("image", imageUpload);
    }
    setValue("text", "");
    setImageUpload("");
    await props.createPostService(form, props.currentUserFetch);
  };

  const handleClick = () => {
    fileInput.current.click();
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

  return (
    <>
      <section className={styles.postStatus}>
        <div className="container">
          <div className="d-flex">
            <div className="me-4">
              <AvatarComponent
                user={props.currentUser}
                width={55}
                height={55}
              />
            </div>
            <form
              encType="multipart/form-data"
              className={styles.postForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextareaAutosize
                type="text"
                className={styles.postControl}
                placeholder="What's on your mind..."
                {...register("text")}
              />
              {previewImage && (
                <div className={styles.previewImageContainer}>
                  <Image
                    src={previewImage}
                    alt="Post photo preview"
                    className={styles.previewImage}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                  <IconButton
                    className={styles.previewImageClose}
                    onClick={() => {
                      setImageUpload("");
                      setPreviewImage("");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}

              <div className={styles.postIcons}>
                <IconButton>
                  <EmojiEmotionsIcon />
                </IconButton>
                <IconButton onClick={() => handleClick()}>
                  <ImageIcon />
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
                </IconButton>
                <button type="submit" className="ms-3 btn btn-secondary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
