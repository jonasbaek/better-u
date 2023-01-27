import AvatarComponent from "../avatar";
import postSchema from "./validation";
import styles from "../../styles/styles.module.scss";
import { IconButton, InputBase } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
    await props.createPostService(formData);
    setValue("text", "");
  };

  return (
    <>
      <section className={styles.postStatus}>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <AvatarComponent
                user={props.data.currentUser}
                width={55}
                height={55}
              />
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
      </section>
    </>
  );
}
