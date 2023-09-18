import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AboutUs from '../pages/about/aboutUs';

import { store } from '../app/store';

describe('AboutUs', () => {
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

  it('Renders AboutUs component successfully', async () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Router>
          <AboutUs />;
        </Router>
      </Provider>
    );

    expect(getAllByText(/About us/i)[0]).toBeInTheDocument();
  });
});