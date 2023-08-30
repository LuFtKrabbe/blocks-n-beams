import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Cart from '../../pages/cart/cart';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/notFound/notFound';
import Profile from '../../pages/profile/profile';
import Registration from '../../pages/registration/registration';

import PrivateRoute from './privateRouter';

const AppRouter: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<PrivateRoute page={<Login />} />} />
      <Route path="/registration" element={<PrivateRoute page={<Registration />} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
