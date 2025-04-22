import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching students data
export const studentsData = createAsyncThunk(
  "students/studentsData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://67e1b45d58cc6bf78526d6eb.mockapi.io/students"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for adding a new student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://67e1b45d58cc6bf78526d6eb.mockapi.io/students",
        studentData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for updating an existing student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://67e1b45d58cc6bf78526d6eb.mockapi.io/students/${studentData.id}`,
        studentData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://67e1b45d58cc6bf78526d6eb.mockapi.io/students/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface StudentsState {
  students: Student[];
  loader: boolean;
}

const initialState: StudentsState = {
  students: [],
  loader: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching students data
    builder.addCase(studentsData.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(studentsData.fulfilled, (state, action) => {
      state.loader = false;
      state.students = action.payload;
    });
    builder.addCase(studentsData.rejected, (state) => {
      state.loader = false;
    });

    // Adding a new student
    builder.addCase(addStudent.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.loader = false;
      state.students.push(action.payload);
    });
    builder.addCase(addStudent.rejected, (state) => {
      state.loader = false;
    });

    // Updating an existing student
    builder.addCase(updateStudent.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.loader = false;
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });
    builder.addCase(updateStudent.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(deleteStudent.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.loader = false;
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    });
    builder.addCase(deleteStudent.rejected, (state) => {
      state.loader = false;
    });
  },
});

export default studentsSlice.reducer;
