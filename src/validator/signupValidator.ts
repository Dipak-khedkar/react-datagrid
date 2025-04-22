import { SignupData } from "../pages/SignupPage";
import validator from "validator";

export interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const signupValidator = (data: SignupData) => {
  const { name, email, password, confirmPassword } = data;
  const erros: any = {};

  if (validator.isEmpty(name)) {
    erros.name = "Name is required !";
  }

  if (validator.isEmpty(email)) {
    erros.email = "Email is required !";
  } else if (!validator.isEmail(email)) {
    erros.email = "Email is invalid !";
  }

  if (validator.isEmpty(password)) {
    erros.password = "Password is required !";
  } else if (!validator.isLength(password, { min: 6 })) {
    erros.password = "Password should be 6 char!";
  }

  if (validator.isEmpty(confirmPassword)) {
    erros.confirmPassword = "Confirm Password is required !";
  } else if (password !== confirmPassword) {
    erros.confirmPassword = "Password should be match!";
  }
  return erros;
};
