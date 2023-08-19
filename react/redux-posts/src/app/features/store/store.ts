import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";

const store = configureStore({
  reducer: {
    name: postsReducer
  }
});

export default store;