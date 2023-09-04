import { ProductProjection } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IProductsSearchList {
  isSearching: boolean;
  productsSearchList: ProductProjection[];
}

const initialState: IProductsSearchList = {
  isSearching: false,
  productsSearchList: [],
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
  },
});

export const { setProductsSearchList, setIsSearching } = productsSearchListSlice.actions;
export default productsSearchListSlice.reducer;
