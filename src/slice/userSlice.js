import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: {
    token: "",
    userId: "",
    userName: "",
    imageUrl: "",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, { payload }) {
      state.profile = {
        token: payload.token,
        userId: payload.userId,
        userName: payload.userName,
        imageUrl: payload.imageUrl,
      };
    },
    setLogout(state) {
      state.profile = {
        ...initialState.profile,
      };
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
