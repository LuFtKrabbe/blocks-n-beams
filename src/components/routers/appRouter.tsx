import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import CardDetail from '../../pages/cardDetail/cardDetail';
import Cart from '../../pages/cart/cart';
import Aerocrete from '../../pages/categories/aerocrete';
import Aggregates from '../../pages/categories/aggregates';
import Beams from '../../pages/categories/beams';
import Blocks from '../../pages/categories/blocks';
import Bricks from '../../pages/categories/bricks';
import ReinforcedConcrete from '../../pages/categories/reinforcedConcrete';
import Timber from '../../pages/categories/timber';
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
      <Route path="/profile" element={<Navigate to="/login" />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:id" element={<CardDetail />} />
      <Route path="/main/beams" element={<Beams />} />
      <Route path="/main/blocks" element={<Blocks />} />
      <Route path="/main/bricks" element={<Bricks />} />
      <Route path="/main/aerocrete" element={<Aerocrete />} />
      <Route path="/main/reinforced-concrete" element={<ReinforcedConcrete />} />
      <Route path="/main/timber" element={<Timber />} />
      <Route path="/main/aggregates" element={<Aggregates />} />
      <Route path="/main/beams/:id" element={<Beams />} />
      <Route path="/main/blocks/:id" element={<Blocks />} />
      <Route path="/main/bricks/:id" element={<CardDetail />} />
      <Route path="/main/aerocrete/:id" element={<CardDetail />} />
      <Route path="/main/reinforced-concrete/:id" element={<CardDetail />} />
      <Route path="/main/timber/:id" element={<CardDetail />} />
      <Route path="/main/aggregates/:id" element={<CardDetail />} />
      <Route path="/login" element={<PrivateRoute page={<Login />} />} />
      <Route path="/registration" element={<PrivateRoute page={<Registration />} />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/error" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};

export default AppRouter;
