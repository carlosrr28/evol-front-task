import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../tasks/services/task-slice.service";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
