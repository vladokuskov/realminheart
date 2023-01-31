import { createSlice } from "@reduxjs/toolkit";

interface Data {
  id: string;
  title: string;
  content: string;
  date: string;
  fulldate: Date;
  image: string;
  authorUID: string;
  cat: string;
  tags: string;
}

interface CounterState {
  fetchingStatus: Status;
  data: Data[];
}

enum Status {
  FETCHING,
  SUCCESS,
  ERROR,
}

const initialState: CounterState = {
  fetchingStatus: Status.FETCHING,
  data: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateDataSuccess: (state, action) => {
      return {
        ...state,
        fetchingStatus: Status.SUCCESS,
        data: [...state.data, action.payload],
      };
    },
    updateDataError: (state) => {
      return {
        ...state,
        fetchingStatus: Status.ERROR,
      };
    },
  },
});

export const { updateDataSuccess, updateDataError } = dataSlice.actions;
export default dataSlice.reducer;
