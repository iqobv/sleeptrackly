import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice.js";
import themeSlice from "./slices/themeSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
  },
});

export default store;
