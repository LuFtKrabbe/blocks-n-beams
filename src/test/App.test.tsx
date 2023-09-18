import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from '../pages/login/login';
import { store } from '../app/store';
 
describe('App', () => {
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

  it('renders Main component', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />;
        </Router>,
    </Provider>
    )
  });
});
