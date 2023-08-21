import React from 'react';
import { render, act, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login/login';
import Registration from '../pages/registration/registration';
import Main from '../pages/main/main';
import NotFound from '../pages/notFound/notFound';
import Navbar from '../components/UI/navbar/navbar';

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

    cleanup;
  });

  afterEach(cleanup);

  it('renders Login component', async () => {
    await act(async () => {
      render(
        <Router>
          <Login />;
        </Router>
      );
    });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('renders Registration component', async () => {
    const FIRST_ELEM = 0;
    const SECOND_ELEM = 1;
    const THIRD_ELEM = 2;

    await act(async () => {
      render(
        <Router>
          <Registration />;
        </Router>,
      );
    });

    expect(screen.getAllByText(/Already have an account?/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/First Name/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Last Name/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Password/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Password/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Billing Address/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/First Name/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Last Name/i)[SECOND_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Address Line 1/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Address Line 2/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Region/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/City/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Country/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Postal code/i)[FIRST_ELEM]).toBeInTheDocument();
    expect(screen.getAllByText(/Phone/i)[FIRST_ELEM]).toBeInTheDocument();

    expect(screen.getAllByText(/Shipping Address/i)[FIRST_ELEM]).toBeInTheDocument();
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

  it('renders Main component', async () => {
    await act(async () => {
      render(
        <Router>
          <Main />;
        </Router>,
      );
    });

    const element = screen.getByText(/Main page/i);
    expect(element).toBeInTheDocument();
  });

  it('renders NotFound component', async () => {
    await act(async () => {
      render(
        <Router>
          <NotFound />;
        </Router>,
      );
    });

    const element = screen.getByText(/404/i);
    expect(element).toBeInTheDocument();
  });

  it('renders Navbar component', async () => {
    await act(async () => {
      render(
        <Router>
          <Navbar />;
        </Router>,
      );
    });

    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
  });
});
