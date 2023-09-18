import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Cart from '../pages/cart/cart';

import { store } from '../app/store';

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
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Cart />;
        </Router>
      </Provider>
    );

    expect(getByText(/Cart is empty!/i)).toBeInTheDocument();
  });
});