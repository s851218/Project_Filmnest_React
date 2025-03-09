import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  value: "",
  isSearchOpen: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText(state, { payload }) {
      state.text = payload;
    },
    setSearchValue(state, { payload }) {
      state.value = payload;
    },
    setIsSearchOpen(state, { payload }) {
      state.isSearchOpen = payload;
    },
  },
});

export const { setSearchText, setSearchValue, setIsSearchOpen } = searchSlice.actions;
export default searchSlice.reducer;
