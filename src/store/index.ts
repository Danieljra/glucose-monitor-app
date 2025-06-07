import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './slices/authSlice';
import glucoseSlice from './slices/glucoseSlice';

//  CONFIGURACIÓN DE PERSISTENCIA
const persistConfig = {
  key: 'root', // Clave para identificar en AsyncStorage
  storage: AsyncStorage, // Donde se guardará (AsyncStorage en RN)
  whitelist: ['auth'], // Solo persiste el slice 'auth'
  timeout: 10000, // 10 segundos en lugar del default (5s)
  debug: __DEV__, // Solo en desarrollo
};

// COMBINO LOS REDUCERS
const rootReducer = combineReducers({
  auth: authSlice,
  glucose: glucoseSlice,
});

// REDUCER PERSISTENTE
const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora estas acciones de redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// PERSISTOR
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
