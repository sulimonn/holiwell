import Loader from 'components/Loader';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useGetMeQuery, useLogoutMutation } from 'store/reducers/authApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState('loading');
  const [user, setUser] = useState(null);
  const [login] = useLoginMutation();
  const {
    data: userData,
    refetch,
    isFetching,
    isLoading,
  } = useGetMeQuery(null, {
    skip: isAuthenticated,
  });
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [userData]);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials).unwrap();
      refetch();
      navigate('/');
    } catch (error) {
      console.error('Failed to login:', error);
      setIsAuthenticated(false);
      setUser(null);
      return error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const refreshAuthState = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isFetching || isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login: handleLogin, logout: handleLogout, refreshAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
