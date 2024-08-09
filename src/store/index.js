import {
  combineReducers,
  configureStore,
  // getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root", //key name
  storage, // localStorage save
  // whitelist : [], // 여러 리듀서 중 해당 리듀서만 로컬저장
  // blacklist: [] // 그것만 제외
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
