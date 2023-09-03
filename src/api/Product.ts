import { ClientResponse, Product, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

import getApiRoot from './Client';

export default class ProductApi {
  static MAIN_LINK_ID = '48df60e0-fafd-42b9-a970-2e5bb9915016';
  static SQUARE_LINK_ID = '19fbc664-7671-4d1f-9f9d-a4d40e02fbf8';
  static CIRCLE_LINK_ID = '48df60e0-fafd-42b9-a970-2e5bb9915016';
  static DELTA_LINK_ID = 'c8e9a09c-2a45-465a-8825-381b76187c85';

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
