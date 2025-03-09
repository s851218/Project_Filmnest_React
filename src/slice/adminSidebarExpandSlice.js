import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  expanded: {
    project: false,
    media: false,
  },
};
export const adminSidebarExpandSlice = createSlice({
  name: "expanded",
  initialState,
  reducers: {
    setExpanded(state, { payload }) {
      console.log(payload);
      if (payload === "project") {
        state.expanded.project = !state.expanded.project;
      } else if (payload === "reset") {
        state.expanded.project = false;
      }
      if (payload === "media") {
        state.expanded.media = !state.expanded.media;
      }
    },
  },
});

export const { setExpanded } = adminSidebarExpandSlice.actions;

export default adminSidebarExpandSlice.reducer;
