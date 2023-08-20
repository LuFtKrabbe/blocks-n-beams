import { Navigate } from 'react-router-dom';

import CustomerApi from '../../api/customerApi';

export const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const isRedirection = CustomerApi.customerIsLoggedIn(); // plug: redirect condition.
  if (isRedirection) {
    return <Navigate to="/main" replace={true} />;
  }
  return page;
};

export default PrivateRoute;
