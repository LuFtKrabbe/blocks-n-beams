import { render, screen, act } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import Main from './main';

test('Main page renders succesfully', async () => {
  const promise = Promise.resolve();
  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
  );
  const element = screen.getByText(/Main Page/);
  expect(element).toBeInTheDocument();
  await act(() => promise);
});
