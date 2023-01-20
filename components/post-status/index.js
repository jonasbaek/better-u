import Avatar from "@mui/material/Avatar";
import postSchema from "./validation";
import styles from "../../styles/styles.module.scss";
import { IconButton, InputBase } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";

export default function PostStatus(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (formData) => {
    await props.createPost(formData);
    setValue("text", "");
  };

  return (
    <>
      <div className={styles.postStatus}>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <Avatar className="mt-2" sx={{ width: 45, height: 45 }}>
                {props.data.currentUser?.username}
              </Avatar>
            </div>
            <form
              className={`${styles.searchForm} col-10`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputBase
                type="text"
                className={styles.searchControl}
                placeholder="What's on your mind..."
                {...register("text")}
              />
              <IconButton>
                <EmojiEmotionsIcon />
              </IconButton>
              <button type="submit" hidden>
                Post
              </button>
            </form>
          </div>
        </div>
        <span className={styles.line} />
      </div>
    </>
  );
}
