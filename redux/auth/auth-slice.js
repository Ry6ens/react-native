import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, name: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
