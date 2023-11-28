import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    product: productReducer,
    breadcrumb: breadcrumbReducer,
  },
});

export default store;
