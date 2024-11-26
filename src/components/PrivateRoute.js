import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import Login from 'pages/authentication/Login';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/reducers/snackbar';

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isUserFetching, isUserLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isUserFetching &&
      !isUserLoading &&
      !localStorage.getItem('authToken')
    ) {
      navigate('/login', { replace: true });
      dispatch(openSnackbar({ message: 'Войдите чтобы продолжить', severity: 'warning' }));
    }
  }, [isAuthenticated, isUserFetching, isUserLoading, navigate, dispatch]);

  if (!isAuthenticated && !isUserFetching && !isUserLoading && !localStorage.getItem('authToken')) {
    return <Login />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
