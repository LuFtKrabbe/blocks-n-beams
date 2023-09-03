import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import CardDetail from '../../pages/cardDetail/cardDetail';
import Cart from '../../pages/cart/cart';
import Circle from '../../pages/categories/circle';
import Delta from '../../pages/categories/delta';
import Square from '../../pages/categories/square';
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
      <Route path="/main/:id" element={<CardDetail />} />
      <Route path="/main/square" element={<Square />} />
      <Route path="/main/circle" element={<Circle />} />
      <Route path="/main/delta" element={<Delta />} />
      <Route path="/main/square/:id" element={<CardDetail />} />
      <Route path="/main/circle/:id" element={<CardDetail />} />
      <Route path="/main/delta/:id" element={<CardDetail />} />
      <Route path="/login" element={<PrivateRoute page={<Login />} />} />
      <Route path="/registration" element={<PrivateRoute page={<Registration />} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/error" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};

export default AppRouter;
