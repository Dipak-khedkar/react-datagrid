import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Errors, signupValidator } from "../validator/signupValidator";
import bcrypt from "bcryptjs";
import { useAppDispatch } from "../store/store";
import { signupUser } from "../store/slice/authSlice";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();

  const handleInpuChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const response = signupValidator(signupData);
    if (Object.keys(response).length > 0) {
      setErrors(response);
    } else {
      setErrors({});

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(signupData.password, salt);

      delete signupData.confirmPassword;
      dispatch(signupUser({ ...signupData, password: hash }));

      setSignupData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6" textAlign="center">
              Signup
            </Typography>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <TextField
                  label="Name"
                  name="name"
                  margin="normal"
                  value={signupData.name}
                  onChange={handleInpuChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  margin="normal"
                  type="email"
                  value={signupData.email}
                  onChange={handleInpuChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
                <TextField
                  label="Password"
                  name="password"
                  margin="normal"
                  type="password"
                  value={signupData.password}
                  onChange={handleInpuChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  margin="normal"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={handleInpuChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  fullWidth
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: "100%" }}
                >
                  Signup
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupPage;
