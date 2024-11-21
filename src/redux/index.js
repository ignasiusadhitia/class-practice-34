import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./async/todosSlice";
import langReducer from "./slices/langSlice";

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_ENCRYPT_KEY,
  onError: (error) => {
    console.error("Error while encrypting", error);
  },
});

export const rootReducer = combineReducers({
  todos: todoReducer,
  lang: langReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos", "lang"],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid redux-persist serialize error
    }),
});

const persistor = persistStore(store);

export { store, persistor };
