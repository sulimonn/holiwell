import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from 'store/reducers/authApi';
import { useGetMeQuery } from 'store/reducers/userApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState('loading');
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [login] = useLoginMutation();
  const {
    data: userData,
    refetch,
    isFetching,
    ...props
  } = useGetMeQuery(null, {
    skip: !localStorage.getItem('authToken'),
  });
  const [logout] = useLogoutMutation();
  const [register] = useRegisterMutation();

  useEffect(() => {
    if (userData?.id && props?.status === 'fulfilled') {
      setUser(userData);
      setIsAuthenticated(true);
      setisLoading(false);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setisLoading(false);
    }
  }, [userData, props]);

  useEffect(() => {
    if (props?.status === 'uninitialized') {
      setisLoading(false);
    }
  }, [props]);
  const handleLogin = async (credentials) => {
    try {
      const { access_token } = await login(credentials).unwrap();

      // Store token and update state
      localStorage.setItem('authToken', access_token);

      return null; // Indicate success
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      return error; // Return error for further handling
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('authToken');
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

  const handleRegister = async (credentials) => {
    try {
      await register(credentials).unwrap();
      const { access_token } = await login({
        username: credentials.email,
        password: credentials.password,
      }).unwrap();
      localStorage.setItem('authToken', access_token);
      const { data } = await refetch();
      setUser(() => data);
      setIsAuthenticated(true);
      navigate('/');
      window.location.reload();
      return null;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        refreshAuthState,
        isUserFetching: isFetching,
        isUserLoading: isLoading,
        isLoading: isLoading || isAuthenticated === 'loading' || isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
