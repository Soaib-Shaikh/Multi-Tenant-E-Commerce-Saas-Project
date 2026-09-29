import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("shopSaasUser");
let parsedUser = null;
try { parsedUser = savedUser ? JSON.parse(savedUser) : null; } catch { localStorage.removeItem("shopSaasUser"); }

const initialState = {
  user: parsedUser,
  isAuthenticated: !!parsedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem(
        "shopSaasUser",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("shopSaasUser");
    },

    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      localStorage.setItem(
        "shopSaasUser",
        JSON.stringify(state.user)
      );
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
} = authSlice.actions;

export default authSlice.reducer;
