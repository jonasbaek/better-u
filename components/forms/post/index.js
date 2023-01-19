import postSchema from "./validation";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PostForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (formData) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${props.data}`,
        },
      });
      props.posts.mutate();
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="What's on your mind..."
        {...register("text")}
      />
      <button type="submit">Post</button>
    </form>
  );
}
