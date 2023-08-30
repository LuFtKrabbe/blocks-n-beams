import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: { [key: string]: boolean } = {
  isLogIn: false,
  isLogInStorage: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogIn(state: { [key: string]: boolean }, action: PayloadAction<boolean>) {
      state.isLogIn = action.payload;
    },
    setLogInStorage(state: { [key: string]: boolean }, action: PayloadAction<boolean>) {
      state.isLogInStorage = action.payload;
    },
  },
});
