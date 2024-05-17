import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const Lessons = Loadable(lazy(() => import('pages/lessons')));

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
      path: '/lessons',
      element: <Lessons />,
    },
  ],
};

export default MainRoutes;
