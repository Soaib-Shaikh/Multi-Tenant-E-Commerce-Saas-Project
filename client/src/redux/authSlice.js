import { createSlice } from "@reduxjs/toolkit";
import { normalizeUser, TOKEN_KEY } from "../api/client";

const USER_KEY = "shopSaasUser";
let parsedUser = null;
try {
  const saved = localStorage.getItem(USER_KEY);
  parsedUser = saved ? JSON.parse(saved) : null;
} catch {
  localStorage.removeItem(USER_KEY);
}
const savedToken = localStorage.getItem(TOKEN_KEY);
if (!savedToken) {
  parsedUser = null;
  localStorage.removeItem(USER_KEY);
}

const initialState = { user: parsedUser ? normalizeUser(parsedUser) : null, token: savedToken, isAuthenticated: Boolean(parsedUser && savedToken) };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = normalizeUser(action.payload.user);
      state.token = action.payload.token;
      state.isAuthenticated = Boolean(state.user && state.token);
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
      localStorage.setItem(TOKEN_KEY, state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("shopSaasCart");
      localStorage.removeItem("shopSaasOrders");
    },
    updateProfile: (state, action) => {
      state.user = normalizeUser({ ...state.user, ...action.payload });
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
