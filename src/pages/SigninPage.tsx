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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Errors, signinValidator } from "../validator/signinValidator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginUser, updateUser } from "../store/slice/authSlice";
import bcrypt from "bcryptjs";

export interface signinData {
  email: string;
  password: string;
}

const SigninPage = () => {
  const [signinData, setsigninData] = useState<signinData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const { users } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loginUser());
  });

  const handleInpuChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setsigninData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = signinValidator(signinData);
    if (Object.keys(response).length > 0) {
      setErrors(response);
    } else {
      setErrors({});

      const user: any = users.find((u: any) => u.email === signinData.email);
      if (user) {
        try {
          const match = await bcrypt.compare(
            signinData.password,
            user.password
          );
          if (match) {
            localStorage.setItem("user", "true");
            dispatch(updateUser(match));
            setsigninData({ email: "", password: "" });
          } else {
            setErrors({
              password: "password is incorrect",
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrors({
          email: "email doesnt exist",
        });
      }
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
                  label="Email"
                  name="email"
                  margin="normal"
                  type="email"
                  value={signinData.email}
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
                  value={signinData.password}
                  onChange={handleInpuChange}
                  error={!!errors.password}
                  helperText={errors.password}
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

export default SigninPage;
