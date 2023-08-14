import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const isRedirection = false; // plug: redirect condition.
  if (isRedirection) {
    return <Navigate to="/main" replace={true} />;
  }
  return page;
};

export default PrivateRoute;
