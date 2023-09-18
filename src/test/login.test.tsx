import { render, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from '../pages/login/login';

import { store } from '../app/store';

describe('Login', () => {
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

  it('Renders Login component successfully', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />;
        </Router>
      </Provider>
    );

    const greeting = getByText(/Welcome to Blocks & Beams!/i);
    expect(greeting).toBeInTheDocument();
    expect(greeting).toHaveTextContent('Welcome to Blocks & Beams!');

    const suggestion = getByText(/Don't have an account?/i);
    expect(suggestion).toBeInTheDocument();
    expect(suggestion).toHaveTextContent(`Don't have an account?`);
    expect(suggestion).toContainHTML(`<p>Don't have an account? <a>Sign Up</a>.</p>`);

    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('Validation messages when trying to login with empty inputs', async () => {
    const { getByRole, findByText } = render(
      <Provider store={store}>
        <Router>
          <Login />;
        </Router>
      </Provider>
    );

    const loginButton = getByRole('button');

    await act(async () => {
      fireEvent.click(loginButton);
    })

    expect(await findByText(/Please enter your email./i)).toBeInTheDocument();
    expect(await findByText(/Please enter your password./i)).toBeInTheDocument();
  });

  it('Wrong attempt to login', async () => {
    const { getByRole, findByText, getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <Login />;
        </Router>
      </Provider>
    )

    const loginButton = getByRole('button');

    await act(async () => {
      fireEvent.change(getByLabelText(/email/i), {
        target: {value: 'lolik-user@mail.com'},
      });
      fireEvent.change(getByLabelText(/password/i), {
        target: {value: 'QweyA187!'},
      })
      fireEvent.click(loginButton);
    })

    console.log = function() {}; //remove output of the response and request from server

    expect(await findByText(/Login failed. Account with the given credentials not found./i)).toBeInTheDocument();
  });

  it('Correct attempt to login', async () => {
    const { getByRole, findByText, getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <Login />;
        </Router>
      </Provider>
    )

    const loginButton = getByRole('button');

    await act(async () => {
      fireEvent.change(getByLabelText(/email/i), {
        target: {value: 'lolik-artem@yandex.ru'},
      });
      fireEvent.change(getByLabelText(/password/i), {
        target: {value: 'QwertyA1!'},
      })
      fireEvent.click(loginButton);
    })
    console.log = function(){}; //remove output of the response and request from server

    expect(await findByText(/Welcome Artem Tirunov!/i)).toBeInTheDocument();
  });
});