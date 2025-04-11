import { createSelector, createSlice } from "@reduxjs/toolkit";

export const pageFind = createSlice({
  name: "pageFinder",
  initialState: { val: 1 },
  reducers: {
    change: (state, action) => {
      state.val = action.payload;
    },
  },
});

export const { change, add } = pageFind.actions;
export default pageFind.reducer;
