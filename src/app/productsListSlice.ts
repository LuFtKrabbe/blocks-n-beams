import { ProductProjection } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  queryArgs: { limit: 20, fuzzy: true },
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
