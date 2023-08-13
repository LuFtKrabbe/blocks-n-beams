import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/notFound/notFound';
import Registration from '../../pages/registration/registration';

import PrivateRoute from './privateRouter';

const AppRouter: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<PrivateRoute page={<Login />} />} />
      <Route path="/registration" element={<PrivateRoute page={<Registration />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
