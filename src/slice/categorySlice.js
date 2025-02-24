import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "all",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.type = payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
