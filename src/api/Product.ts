import { ClientResponse, Product, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

import getApiRoot from './Client';

export default class ProductApi {
  static MAIN_LINK_ID = 'bfae9525-1232-488d-9621-4187156152c0';
  static SQUARE_LINK_ID = 'a19fba54-8d8e-4070-84d8-8ed5603ebe42';
  static CIRCLE_LINK_ID = 'b67e607c-771b-4365-b5d5-69dc0ab62e79';
  static DELTA_LINK_ID = '98845ce7-0149-4716-ad46-edd9a9bb764f';

  static getCategoriesById = (categoriesId: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
    return getApiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 20,
          filter: `categories.id:"${categoriesId}"`,
        },
      })
      .execute();
  };

  static getCardById = (cardId: string): Promise<ClientResponse<Product>> => {
    return getApiRoot().products().withId({ ID: cardId }).get().execute();
  };
}
