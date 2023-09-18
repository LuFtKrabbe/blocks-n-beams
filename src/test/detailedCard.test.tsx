import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ProductData, ProductProjection } from '@commercetools/platform-sdk';
import ProductApi from '../api/Product';

import CardDetail from '../pages/cardDetail/cardDetail';

import { store } from '../app/store';
import { mockComponent } from 'react-dom/test-utils';

describe('Cart', () => {
  beforeEach(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  it('Renders Cart component successfully', async () => {

    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <CardDetail />
        </Router>
      </Provider>
    );

    expect(await findByText(/Failed/i)).toBeInTheDocument();
  });
});