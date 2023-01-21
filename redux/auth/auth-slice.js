import { createSlice } from "@reduxjs/toolkit";

import { signUp, logIn, logOut, authStateChangedUser } from "./auth-operations";

const initialState = {
  user: {},
  message: "",
  stateChange: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SignUp by email
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = {
          uid: payload.uid,
          email: payload.email,
          name: payload.displayName,
        };
        state.stateChange = true;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // LogIn
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = {
          uid: payload.uid,
          email: payload.email,
          name: payload.displayName,
        };
        state.stateChange = true;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // LogOut
    builder
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, () => ({ ...initialState }))
      .addCase(logOut.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // authStateChangedUser
    builder
      .addCase(authStateChangedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authStateChangedUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = {
          uid: payload.uid,
          email: payload.email,
          name: payload.displayName,
        };
        state.stateChange = true;
      })
      .addCase(authStateChangedUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });
  },
});

export default authSlice.reducer;
