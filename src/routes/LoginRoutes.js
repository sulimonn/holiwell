import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const ForgotPassword = Loadable(lazy(() => import('pages/authentication/ForgotPassword')));
const ChangePassword = Loadable(lazy(() => import('pages/authentication/ChangePassword')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />,
    },
    {
      path: 'register',
      element: <AuthRegister />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'update-password',
      element: <ForgotPassword />,
    },
    {
      path: 'reset-password',
      element: <ChangePassword />,
    },
    {
      path: 'change-password',
      element: <ChangePassword />,
    },
  ],
};

export default LoginRoutes;
