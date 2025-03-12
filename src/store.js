import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import categoryReducer from "./slice/categorySlice";
import adminSidebarExpandReducer from "./slice/adminSidebarExpandSlice";
import searchReducer from "./slice/searchSlice";
import paymentInfoReducer from "./slice/paymentInfoSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    expanded: adminSidebarExpandReducer,
    search: searchReducer,
    paymentInfo: paymentInfoReducer,
  },
});
