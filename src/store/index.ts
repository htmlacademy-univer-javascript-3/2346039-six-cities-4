import { configureStore, } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { ApiService } from '../services/api-service';

export const store = configureStore({reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  thunk: {
    extraArgument: ApiService
  }
})});
