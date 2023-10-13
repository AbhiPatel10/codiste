'use client'

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/user/userSlice'
import thunk from 'redux-thunk'; 

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },
});

const RootState = () => typeof store.getState();
const AppDispatch = () => typeof store.dispatch();

module.exports = { store, RootState, AppDispatch };
