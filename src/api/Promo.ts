import {
  CartDiscountPagedQueryResponse,
  ClientResponse,
  DiscountCodePagedQueryResponse,
} from '@commercetools/platform-sdk';

import getApiRoot from './Client';

export default class PromoApi {
  static getCartDiscounts = (): Promise<ClientResponse<CartDiscountPagedQueryResponse>> => {
    return getApiRoot().cartDiscounts().get().execute();
  };
  static getDiscountCodes = (): Promise<ClientResponse<DiscountCodePagedQueryResponse>> => {
    return getApiRoot().discountCodes().get().execute();
  };
}
