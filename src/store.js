import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import categoryReducer from "./slice/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});
