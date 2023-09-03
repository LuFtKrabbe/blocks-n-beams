import { ProductProjection } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ProductProjection[] = [];

const productsListSlice = createSlice({
  name: 'productsList',
  initialState,
  reducers: {
    updateProductsList(state: ProductProjection[], action: PayloadAction<ProductProjection[]>) {
      return action.payload;
    },
  },
});

export const { updateProductsList } = productsListSlice.actions;
export default productsListSlice.reducer;
