import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Aerocrete from '../pages/categories/aerocrete';

import { store } from '../app/store';
import Aggregates from '../pages/categories/aggregates';

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

  test('Aerocrete category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <Aerocrete />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Aerocrete block', { exact: true })).toBeInTheDocument();
  });

  test('Aggregates category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <Aggregates />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Vermiculite', { exact: true })).toBeInTheDocument();
    expect(await findByText('Gravel', { exact: true })).toBeInTheDocument();
  });

});



