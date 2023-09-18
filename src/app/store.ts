import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import cartReducer from './cartSlice';
import productsSearchListReducer from './productsListSlice';
import { userSlice } from './reducers';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    productsSearch: productsSearchListReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
