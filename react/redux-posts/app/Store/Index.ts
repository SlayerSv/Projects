import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Posts/postsSlice";
import usersReducer  from "./Users/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>