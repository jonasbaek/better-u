import signUpSchema from "./validation";
import PasswordRequirements from "../../password-requirements";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
      <form
        className="form d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Create your account!</h1>
        <FormControl className="mt-5" error={errors.email} variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            id="input-with-icon-adornment"
            type="email"
            {...register("email")}
            onChange={(e) => {
              setValue("email", e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={(e) => {
              setValue("email", e.target.value, {
                shouldValidate: true,
              });
            }}
            startAdornment={
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">
            {errors.email?.message}
          </FormHelperText>
        </FormControl>
        <FormControl className="mt-4" error={errors.name} variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
          <Input
            id="input-with-icon-adornment"
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
        <FormControl
          className="mt-4"
          error={errors.username}
          variant="standard"
        >
          <InputLabel htmlFor="input-with-icon-adornment">User Name</InputLabel>
          <Input
            id="input-with-icon-adornment"
            {...register("username")}
            onChange={(e) => {
              setValue("username", e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={(e) => {
              setValue("username", e.target.value, {
                shouldValidate: true,
              });
            }}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">
            {errors.username?.message}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={errors.password}
          className="my-4"
          variant="standard"
        >
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            id="input-with-icon-adornment"
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
            startAdornment={
              <InputAdornment position="start">
                <LockOpenIcon />
              </InputAdornment>
            }
          />
          {(errors.password || passwordIsDirty) && (
            <PasswordRequirements requirements={requirements} />
          )}
        </FormControl>

        <div className="mt-4 text-center">
          <button type="submit" className="w-100 btn btn-secondary">
            Create account
          </button>
        </div>
      </form>
    </>
  );
}
