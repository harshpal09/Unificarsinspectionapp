import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "../features/GlobalSlice";

export const store = configureStore({
    reducer: {
        isUserLoggedIn  : GlobalSlice
    },
  })