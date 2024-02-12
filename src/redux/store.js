import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";

const rootReducers = combineReducers({
  messageReducer,
  userReducer,
  searchReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export default store;
