import { render, act, screen, fireEvent, findAllByText, findByLabelText } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Registration from '../pages/registration/registration';

import { store } from '../app/store';

describe('Registration', () => {
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

  const FIRST_ELEM = 0;
  const SECOND_ELEM = 1;
  const THIRD_ELEM = 2;

  it('Renders Registration component', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Registration />;
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
    expect(screen.getAllByText(/First Name/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Last Name/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Password/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Password/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();

    expect(screen.getByText(/Billing Address/i)).toBeInTheDocument();
    expect(screen.getAllByText(/First Name/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Last Name/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Address Line 1/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Address Line 2/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Region/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/City/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Country/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Postal code/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Phone/i)[FIRST_ELEM]).toBeInTheDocument();

    expect(screen.getByText(/Shipping Address/i)).toBeInTheDocument();
    expect(screen.getAllByText(/First Name/i)[THIRD_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Last Name/i)[THIRD_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Address Line 1/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Address Line 2/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Region/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/City/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Country/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Postal code/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Phone/i)[SECOND_ELEM]).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('Validation messages when trying to register with empty inputs', async () => {
    const { getByRole, findByText, findAllByText } = render(
      <Provider store={store}>
        <Router>
          <Registration />;
        </Router>
      </Provider>
    );

    const submitButton = getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.click(submitButton);
    })

    expect((await findAllByText(/Please enter a first name./i))[FIRST_ELEM]).toBeInTheDocument();
    expect((await findAllByText(/Please enter a last name./i))[FIRST_ELEM]).toBeInTheDocument();
    expect(await findByText(/Please enter a date of birth/i)).toBeInTheDocument();
    expect(await findByText(/Please input a password./i)).toBeInTheDocument();
    expect(await findByText(/Please confirm your password./i)).toBeInTheDocument();

    expect(await findByText(/Please enter a billing address./i)).toBeInTheDocument();
    expect(await findByText(/Please enter a shipping address./i)).toBeInTheDocument();

    expect((await findAllByText(/Please enter a city./i))[FIRST_ELEM]).toBeInTheDocument();
    expect((await findAllByText(/Please enter a phone number./i))[FIRST_ELEM]).toBeInTheDocument();
    expect((await findAllByText(/Please select a country./i))[FIRST_ELEM]).toBeInTheDocument();
    expect((await findAllByText(/Please enter a postal code./i))[FIRST_ELEM]).toBeInTheDocument();
  });

  it('Validation messages when trying to register with wrong date of birth', async () => {
    const { getByLabelText, findByText } = render(
      <Provider store={store}>
        <Router>
          <Registration />;
        </Router>
      </Provider>
    );

    const birthInput = getByLabelText('Birthday');

    await act(async () => {
      fireEvent.mouseDown(birthInput)
      fireEvent.change(birthInput, {
        target: {value: '2023-09-18'},
      })
      fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0]);
    })

    expect(await findByText(/Your age should be from 13 to 99./i)).toBeInTheDocument();
  });

  it('Reset button works good', async () => {
    const { getByRole, getAllByLabelText, findAllByLabelText } = render(
      <Provider store={store}>
        <Router>
          <Registration />;
        </Router>
      </Provider>
    );

    const resetButton = getByRole('button', { name: 'Reset' });

    await act(async () => {
      fireEvent.change(getAllByLabelText(/First Name/i)[FIRST_ELEM], {
        target: {value: 'Svetozar'},
      })
      fireEvent.change(getAllByLabelText(/Last Name/i)[FIRST_ELEM], {
        target: {value: 'Pchelov'},
      })
    })

    expect((await findAllByLabelText(/First Name/i))[FIRST_ELEM]).toHaveValue('Svetozar');
    expect((await findAllByLabelText(/Last Name/i))[FIRST_ELEM]).toHaveValue('Pchelov');

    await act(async () => {
      fireEvent.click(resetButton);
    })

    expect((await findAllByLabelText(/First Name/i))[FIRST_ELEM]).toHaveValue('');
  });

  it('Validation message when passwords do not match', async () => {
    const { getByLabelText, findByText } = render(
      <Provider store={store}>
        <Router>
          <Registration />;
        </Router>
      </Provider>
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Password', { exact: true }), {
        target: {value: 'QwertyuiopA4!'},
      })
      fireEvent.change(getByLabelText('Confirm Password', { exact: true }), {
        target: {value: 'QwertyuiopA1!'},
      })
    })

    expect(await findByText(/Passwords do not match./i)).toBeInTheDocument();
  });
});