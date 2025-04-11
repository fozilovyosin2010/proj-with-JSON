import { configureStore } from "@reduxjs/toolkit";
import pageFind from "../reducer/pageF";
import darkModeFind from "../reducer/darkF";

const store = configureStore({
  reducer: {
    pageNum: pageFind,
    isDarkMode: darkModeFind,
  },
});

export default store;
