import { ProductProjection } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import MyCartApi from '../api/Cart';
import { FlowTypes, changeApiClient } from '../api/Client';
import CustomerApi from '../api/customerApi';

interface ICartState {
  itemsCount: number;
  itemsInCart: ProductProjection[];
}

const getInitialState = (): ICartState => {
  return {
    itemsCount: 0,
    itemsInCart: [],
  };
};

export const addItem = createAsyncThunk('cart/addItem', async (product: ProductProjection) => {
  if (!CustomerApi.customerIsLoggedIn() && !CustomerApi.customerIsAnonymous()) {
    changeApiClient(FlowTypes.ANONYMOUS);
  }

  try {
    await MyCartApi.getActiveCart();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotFound') {
        await MyCartApi.createCart(MyCartApi.createCartDraft('EUR'));
      } else {
        await message.error(error.message);
      }
    }
  }

  try {
    await MyCartApi.addItemToActiveCart(product);
    return product;
  } catch (error) {
    if (error instanceof Error) {
      await message.error(error.message);
    }
  }
});

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (payload: { product: ProductProjection; quantity?: number }) => {
    const { product, quantity } = payload;
    try {
      await MyCartApi.removeItemFromActiveCart(product, quantity);
      return product;
    } catch (error) {
      if (error instanceof Error) {
        await message.error(error.message);
      }
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.itemsInCart.push(action.payload);
        state.itemsCount += 1;
      }
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      if (action.payload) {
        const NOT_FOUND_INDEX = -1;
        const index = state.itemsInCart.indexOf(action.payload);

        if (index > NOT_FOUND_INDEX) {
          state.itemsInCart.splice(index, 1);
          state.itemsCount -= 1;
        }
      }
    });
  },
});

export default cartSlice.reducer;
