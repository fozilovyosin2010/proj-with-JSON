import { configureStore } from "@reduxjs/toolkit";
import pageFind from "../reducer/pageF";

const store = configureStore({
  reducer: {
    pageNum: pageFind,
  },
});

export default store;
