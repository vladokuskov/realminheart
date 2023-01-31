import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
