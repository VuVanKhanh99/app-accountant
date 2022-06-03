import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import combineReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whilelist: ['auth','reqProduct'],
};

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return combineReducer(state, action);
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(),
});

export const persistedStore = persistStore(store);
