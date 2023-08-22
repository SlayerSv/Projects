import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import usersReducer  from "../users/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>