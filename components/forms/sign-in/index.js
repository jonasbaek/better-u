import signInSchema from "./validation";
import toast from "react-hot-toast";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        formData
      );
      setCookie("jwt", data);
      router.push("/");
      toast.success("You are logged!");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            onBlur={(e) => {
              setValue("email", e.target.value, {
                shouldValidate: true,
              });
            }}
          />
          <span className="form-text text-danger">{errors.email?.message}</span>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            onBlur={(e) => {
              setValue("password", e.target.value, {
                shouldValidate: true,
              });
            }}
          />
          <span className="form-text text-danger">
            {errors.password?.message}
          </span>
        </div>
        <button type="submit" className="btn btn-secondary">
          Login
        </button>
      </form>
    </>
  );
}
