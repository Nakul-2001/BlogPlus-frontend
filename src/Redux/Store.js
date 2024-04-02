import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({user:userSlice});
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const Store = configureStore({
  reducer:persistedReducer
});

export let persistor = persistStore(Store);


