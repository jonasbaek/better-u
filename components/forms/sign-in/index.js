import signInSchema from "./validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignInForm(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (formData) => {
    await props.signIn(formData);
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
