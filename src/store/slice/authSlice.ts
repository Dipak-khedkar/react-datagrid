import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignupData } from "../../pages/SignupPage";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://67e1b45d58cc6bf78526d6eb.mockapi.io/auth",
        userData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://67e1b45d58cc6bf78526d6eb.mockapi.io/auth"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  users: User[];
  loader: boolean;
}

const initialState: AuthState = {
  user: null,
  users: [],
  loader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loader = false;
      console.log(action.payload);
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loader = false;
      state.users = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loader = false;
    });
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
