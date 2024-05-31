import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import Page404 from 'pages/404/index';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Page404 />;
};

export default PrivateRoute;
