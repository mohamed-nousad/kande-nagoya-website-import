import { configureStore } from "@reduxjs/toolkit"
import theme from "./slices/themeSlice"
import auth from "./slices/authSlice"
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    theme,
    auth,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store