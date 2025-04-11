import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

let root = window.document.documentElement;
// console.log(root.classList.contains("dark"));

export const darkModeFind = createSlice({
  name: "darkModeFinder",
  initialState: {
    val: root.classList.contains("dark"),
  },
  reducers: {
    toggle: (s, a) => {
      s.val = a.payload;
    },
  },
});

export default darkModeFind.reducer;
export const { toggle } = darkModeFind.actions;
