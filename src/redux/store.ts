import { configureStore } from "@reduxjs/toolkit";
import urlsSlice from "./reducers/urlsSlice";

const store = configureStore({
  reducer: {
    urls: urlsSlice,
  },
});
export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
