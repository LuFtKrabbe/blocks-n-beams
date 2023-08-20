import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('Simple test for App', async () => {
  const promise = Promise.resolve()

  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>,
    </BrowserRouter>
  );

  await act(() => promise);
  expect(getByText(/Login/)).toBeInTheDocument();
});
