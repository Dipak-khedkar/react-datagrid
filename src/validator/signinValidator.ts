import { signinData } from "../pages/SigninPage";
import validator from "validator";

export interface Errors {
  email?: string;
  password?: string;
}

export const signinValidator = (data: signinData) => {
  const { email, password } = data;
  const erros: any = {};

  if (validator.isEmpty(email)) {
    erros.email = "Email is required !";
  } else if (!validator.isEmail(email)) {
    erros.email = "Email is invalid !";
  }

  if (validator.isEmpty(password)) {
    erros.password = "Password is required !";
  }

  return erros;
};
