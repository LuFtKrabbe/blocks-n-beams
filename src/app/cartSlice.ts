import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import MyCartApi from '../api/Cart';
import { FlowTypes, changeApiClient } from '../api/Client';
import CustomerApi from '../api/customerApi';

export interface ICartState {
  cart?: Cart;
}

const initialState: ICartState = {};

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
  async (payload: { lineItemId: string; quantity?: number }) => {
    const { lineItemId, quantity } = payload;
    try {
      const response = await MyCartApi.removeItemFromActiveCart(lineItemId, quantity);
      return response?.body;
    } catch (error) {
      if (error instanceof Error) {
        await message.error(error.message);
      }
    }
  },
);

export const changeItemQuantity = createAsyncThunk(
  'cart/changeItemQuantity',
  async (payload: { lineItemId: string; quantity: number }) => {
    const { lineItemId, quantity } = payload;
    try {
      const response = await MyCartApi.changeItemQuantityInActiveCart(lineItemId, quantity);
      return response?.body;
    } catch (error) {
      if (error instanceof Error) {
        await message.error(error.message);
      }
    }
  },
);

export const deleteActiveCart = createAsyncThunk('cart/deleteCart', async () => {
  try {
    const cartId = (await MyCartApi.getActiveCart()).body.id;
    const response = await MyCartApi.deleteCart(cartId);
    return response?.body;
  } catch (error) {
    if (error instanceof Error) {
      await message.error(error.message);
    }
  }
});

export const getActiveCart = createAsyncThunk('cart/getActiveCart', async () => {
  try {
    const response = await MyCartApi.getActiveCart();
    return response?.body;
  } catch (error) {
    if (error instanceof Error) {
      await message.error(error.message);
    }
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
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
    builder.addCase(changeItemQuantity.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      }
    });
    builder.addCase(deleteActiveCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = undefined;
      }
    });
    builder.addCase(getActiveCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      }
    });
  },
});

export default cartSlice.reducer;
