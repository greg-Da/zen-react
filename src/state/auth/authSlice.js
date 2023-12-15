import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = {
        id: action.payload.id,
        first_name: action.payload.first_name,
        email: action.payload.email,
        admin: action.payload.admin,
      };
    },
    logOut: (state) => {
      state.user = {};
      fetch("https://zen-counseling-production-4a7de6447247.herokuapp.com/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      });
      Cookies.remove("token");
    },
  },
});

export const { logIn, logOut } = auth.actions;

export default auth.reducer;
