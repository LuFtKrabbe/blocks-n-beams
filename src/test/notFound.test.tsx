import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import NotFound from '../pages/notFound/notFound';

import { store } from '../app/store';

it('Renders NotFound component', async () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Router>
        <NotFound />;
      </Router>,
    </Provider>
  );
  const buttonHome = getByRole('button');

  expect(getByText(/404/i)).toBeInTheDocument();
  expect(getByText(/Sorry, but the page/i)).toBeInTheDocument();
  expect(getByText(/not found!/i)).toBeInTheDocument();
  expect(buttonHome).toBeInTheDocument();
});
