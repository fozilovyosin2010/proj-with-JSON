import { configureStore } from "@reduxjs/toolkit";
import pageFind from "../reducer/pageF";
import darkModeFind from "../reducer/darkF";
import backLink from "../reducer/backL";

const store = configureStore({
  reducer: {
    pageNum: pageFind,
    isDarkMode: darkModeFind,
    backL: backLink,
  },
});

export default store;
