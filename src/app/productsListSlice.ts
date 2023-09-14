import { ProductProjection } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PAGE_SIZE } from '../pages/categories/shared';

interface IProductsSearchList {
  isSearching: boolean;
  productsSearchList: ProductProjection[];
  queryArgs: {
    [key: string]: string | number | boolean;
  };
}

const initialState: IProductsSearchList = {
  isSearching: false,
  productsSearchList: [],
  queryArgs: { limit: PAGE_SIZE, fuzzy: true },
};

const productsSearchListSlice = createSlice({
  name: 'productsListSearch',
  initialState,
  reducers: {
    setProductsSearchList(state: IProductsSearchList, action: PayloadAction<ProductProjection[]>) {
      state.productsSearchList = action.payload;
    },
    setIsSearching(state: IProductsSearchList, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    setQueryArgs(state: IProductsSearchList, action: PayloadAction<{ [key: string]: string | number | boolean }>) {
      state.queryArgs = action.payload;
    },
  },
});

export const { setProductsSearchList, setIsSearching, setQueryArgs } = productsSearchListSlice.actions;
export default productsSearchListSlice.reducer;
