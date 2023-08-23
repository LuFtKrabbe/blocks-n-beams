import { FC } from 'react';

import './App.css';

import Navbar from './components/UI/navbar/navbar';
import AppRouter from './components/routers/appRouter';

const App: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
