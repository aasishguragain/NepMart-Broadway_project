import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: {
    data: [],
  },
  reducers: {
    setBreadCrumb: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBreadCrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
