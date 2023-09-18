import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Aerocrete from '../pages/categories/aerocrete';
import Aggregates from '../pages/categories/aggregates';
import Beams from '../pages/categories/beams';
import Blocks from '../pages/categories/blocks';
import Bricks from '../pages/categories/bricks';
import ReinforcedConcrete from '../pages/categories/reinforcedConcrete';
import Timber from '../pages/categories/timber';

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
  
  test('Beams category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <Beams />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Wooden plank', { exact: true })).toBeInTheDocument();
    expect(await findByText('Bulkhead', { exact: true })).toBeInTheDocument();
  });
  
  test('Blocks category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <Blocks />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Perforated clay facing brick', { exact: true })).toBeInTheDocument();
  });

  test('Bricks category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <Bricks />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Solid thickened clay brick', { exact: true })).toBeInTheDocument();
  });

  test('ReinforcedConcrete category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <ReinforcedConcrete />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Foundation beam', { exact: true })).toBeInTheDocument();
  });

  test('Timber category renders succesfully', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Router>
          <Timber />;
        </Router>,
      </Provider>
    );
  
    console.log = function() {}; //remove output of the response and request from server
  
    expect(await findByText('Glued beam', { exact: true })).toBeInTheDocument();
  });
});



