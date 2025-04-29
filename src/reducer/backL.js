import { createSlice } from "@reduxjs/toolkit";

export const backLink = createSlice({
  name: "backLink",
  initialState: { val: "/" },
  reducers: {
    setLink: (state, a) => {
      state.val = a.payload;
    },
  },
});

export const { setLink } = backLink.actions;
export default backLink.reducer;
