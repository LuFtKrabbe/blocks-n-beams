import {
  ClientResponse,
  Cart,
  CartPagedQueryResponse,
  CartDraft,
  ProductProjection,
  MyCartAddLineItemAction,
  MyCartRemoveLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartAddDiscountCodeAction,
} from '@commercetools/platform-sdk';

import getApiRoot from './Client';

export default class MyCartApi {
  static getCustomerCarts = (): Promise<ClientResponse<CartPagedQueryResponse>> => {
    return getApiRoot().me().carts().get().execute();
  };

  static getActiveCart = (): Promise<ClientResponse<Cart>> => {
    return getApiRoot().me().activeCart().get().execute();
  };

  static createCart = (cartDraft: CartDraft): Promise<ClientResponse<Cart>> => {
    return getApiRoot().me().carts().post({ body: cartDraft }).execute();
  };

  static deleteCart = async (cartId: string) => {
    const version = (await this.getCartVersion(cartId)) || 0;

    return getApiRoot().me().carts().withId({ ID: cartId }).delete({ queryArgs: { version } }).execute();
  };

  static getCartById = (cartId: string): Promise<ClientResponse<Cart>> => {
    return getApiRoot().me().carts().withId({ ID: cartId }).get().execute();
  };

  static createCartDraft = (currency: string): CartDraft => {
    return { currency }; // TODO: Check if we need additional fields to be set
  };

  static getCartVersion = async (cartId: string): Promise<number | undefined> => {
    // TODO: fast cart updates can cause racing condition and version missmatch?
    return (await this.getCartById(cartId)).body.version;
  };

  static addItemToActiveCart = async (product: ProductProjection) => {
    const { version, id } = (await this.getActiveCart()).body;

    const addItemAction: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId: product.id,
    };

    return getApiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [addItemAction] } })
      .execute();
  };

  static removeItemFromActiveCart = async (lineItemId: string, quantity?: number) => {
    const { version, id } = (await this.getActiveCart()).body;

    const removeItemAction: MyCartRemoveLineItemAction = {
      action: 'removeLineItem',
      lineItemId,
      quantity,
    };

    return getApiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [removeItemAction] } })
      .execute();
  };

  static changeItemQuantityInActiveCart = async (lineItemId: string, quantity: number) => {
    const { version, id } = (await this.getActiveCart()).body;

    const changeLineItemQuantityAction: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    };

    return getApiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [changeLineItemQuantityAction] } })
      .execute();
  };

  static addDisountCode = async (code: string) => {
    const { version, id } = (await this.getActiveCart()).body;

    const addDisountCodeAction: MyCartAddDiscountCodeAction = {
      action: 'addDiscountCode',
      code,
    };

    return getApiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [addDisountCodeAction] } })
      .execute();
  };
}
