import signInSchema from "./validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";

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
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={errors.email} variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            id="input-with-icon-adornment"
            type="email"
            {...register("email")}
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
            startAdornment={
              <InputAdornment position="start">
                <LockOpenIcon />
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
        <button type="submit" className="btn btn-secondary mt-4">
          Login
        </button>
      </form>
    </>
  );
}
