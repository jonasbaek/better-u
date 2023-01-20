import signUpSchema from "./validation";
import PasswordRequirements from "../../password-requirements";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUpForm(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const [passwordIsDirty, setPasswordIsDirty] = useState(false);

  const requirements = {
    min: passwordIsDirty
      ? errors?.password?.types?.min
        ? false
        : true
      : false,
    lowercase: passwordIsDirty
      ? errors?.password?.types?.matches?.includes("lowercase")
        ? false
        : true
      : false,
    uppercase: passwordIsDirty
      ? errors?.password?.types?.matches?.includes("uppercase")
        ? false
        : true
      : false,
    number: passwordIsDirty
      ? errors?.password?.types?.matches?.includes("number")
        ? false
        : true
      : false,
    special: passwordIsDirty
      ? errors?.password?.types?.matches?.includes("special character")
        ? false
        : true
      : false,
  };

  const onSubmit = async (formData) => {
    await props.createAccount(formData);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create your account!</h1>
        <div className="mt-4 ">
          <label className="d-block">Email</label>
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
        <div className="mt-3">
          <label className="d-block">Name</label>
          <input
            type="text"
            {...register("name")}
            onBlur={(e) => {
              setValue("name", e.target.value, {
                shouldValidate: true,
              });
            }}
          />
          <span className="form-text text-danger">{errors.name?.message}</span>
        </div>
        <div className="mt-3">
          <label className="d-block">User Name</label>
          <input
            type="text"
            {...register("username")}
            onBlur={(e) => {
              setValue("username", e.target.value, {
                shouldValidate: true,
              });
            }}
          />
          <span className="form-text text-danger">
            {errors.username?.message}
          </span>
        </div>
        <div className="mt-3">
          <label className="d-block">Password</label>
          <input
            type="password"
            {...register("password")}
            onChange={(e) => {
              setValue("password", e.target.value, {
                shouldValidate: true,
              });
              if (!(e.target.value === "")) {
                setPasswordIsDirty(true);
              } else setPasswordIsDirty(false);
            }}
            onBlur={(e) => {
              setValue("password", e.target.value, {
                shouldValidate: true,
              });
              if (!(e.target.value === "")) {
                setPasswordIsDirty(true);
              } else setPasswordIsDirty(false);
            }}
          />
          {(errors.password || passwordIsDirty) && (
            <PasswordRequirements requirements={requirements} />
          )}
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-secondary">
            Create account
          </button>
        </div>
      </form>
    </>
  );
}
