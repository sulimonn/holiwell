import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Home = Loadable(lazy(() => import('pages/home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '',
      children: [
        {
          path: '',
          element: <Home />,
        },
      ],
    },
  ],
};

export default MainRoutes;
