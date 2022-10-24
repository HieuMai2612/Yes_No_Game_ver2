import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);



export const store = configureStore({
  reducer: {
    counter: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);