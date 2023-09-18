import { ProductProjection } from '@commercetools/platform-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//TODO: Rename file. To be consistent through project.
export interface IState {
  isLogIn: boolean;
  isLogInStorage: boolean;
  currentProductCard: ProductProjection | unknown;
}

export const initialState: IState = {
  isLogIn: false,
  isLogInStorage: false,
  currentProductCard: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogIn(state: IState, action: PayloadAction<boolean>) {
      state.isLogIn = action.payload;
    },
    setLogInStorage(state: IState, action: PayloadAction<boolean>) {
      state.isLogInStorage = action.payload;
    },
    setCurrentProductCard(state: IState, action: PayloadAction<ProductProjection>) {
      state.currentProductCard = action.payload;
    },
  },
});
