import { render, screen, act } from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from '../pages/main/main';

import { store } from '../app/store';

test('Main page renders succesfully', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Router>
          <Main />;
        </Router>,
      </Provider>
    );
  });

  expect(screen.getByText(/Main/i)).toBeInTheDocument();
  expect(screen.getByText(/BLOCKS/i)).toBeInTheDocument();
  expect(screen.getByText(/BEAMS/i)).toBeInTheDocument();
  expect(screen.getByText(/AGGREGATES/i)).toBeInTheDocument();
});
