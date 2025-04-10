import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    swipedIn: false,
    loggedIn: false,
    token: "",
    user: {},
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setSwipedIn: (state,action) => {
      state.swipedIn = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
});

export const { setLoggedIn, setToken, setUser, setSwipedIn } = authSlice.actions;
export default authSlice.reducer;
