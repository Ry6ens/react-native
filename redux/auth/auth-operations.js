import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// import { axiosSignUp, axiosLogIn, axiosLogOut } from "api/auth";

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log(email, password);
      const data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data);
      //   return data;
    } catch (error) {
      const { data, status } = error.response;

      return rejectWithValue({ data, status });
    }
  }
);

// export const logIn = createAsyncThunk(
//   "auth/login",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const data = await axiosLogIn(userData);
//       return data;
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );

// export const logOut = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const {
//         auth: { accessToken },
//       } = getState();
//       const data = await axiosLogOut(accessToken);
//       return data;
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );
