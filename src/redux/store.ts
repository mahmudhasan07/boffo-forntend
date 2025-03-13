import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "@/feature/cart/CartSlice";
import authReducer from "./slice/authSlice";
import baseApi from "./api/baseApi";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // Persist cart and auth
};

// Combine Reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer, // Add auth reducer
  [baseApi.reducerPath]: baseApi.reducer,
});

// Apply Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
