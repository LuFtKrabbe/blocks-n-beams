import {
  ClientResponse,
  Cart,
  CartPagedQueryResponse,
  CartDraft,
  ProductProjection,
  MyCartAddLineItemAction,
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

  static removeCart = async (cartId: string) => {
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
    const addItemAction: MyCartAddLineItemAction = {
      action: 'addLineItem',
      productId: product.id,
    };

    const { version, id } = (await this.getActiveCart()).body;

    return getApiRoot()
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [addItemAction] } })
      .execute();
  };
}
