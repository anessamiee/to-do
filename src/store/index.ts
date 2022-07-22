import { configureStore, Store } from "@reduxjs/toolkit";

import toDoItem from "../types/toDoItem";
import todoReducer from "./todoReducer";

const store: Store<toDoItem[]> = configureStore({
  reducer: todoReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
