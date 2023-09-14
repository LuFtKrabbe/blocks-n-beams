import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import MyCartApi from '../api/Cart';
import { FlowTypes, changeApiClient } from '../api/Client';
import CustomerApi from '../api/customerApi';

interface ICartState {
  cart: Cart | undefined;
}

const getInitialState = (): ICartState => {
  return {
    cart: undefined,
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
    const response = await MyCartApi.addItemToActiveCart(product);
    return response.body;
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
      const response = await MyCartApi.removeItemFromActiveCart(product, quantity);
      return response?.body;
    } catch (error) {
      if (error instanceof Error) {
        await message.error(error.message);
      }
    }
  },
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async (payload: { lineItemId: string; quantity: number }) => {
    const { lineItemId, quantity } = payload;
    try {
      const response = await MyCartApi.updateItemQuantityInActiveCart(lineItemId, quantity);
      return response?.body;
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
        state.cart = action.payload;
      }
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      }
    });
    builder.addCase(updateItemQuantity.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      }
    });
  },
});

export default cartSlice.reducer;
