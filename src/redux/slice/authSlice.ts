import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  name: string | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  name: null,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; token: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
