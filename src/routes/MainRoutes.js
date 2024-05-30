import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const Lessons = Loadable(lazy(() => import('pages/lessons')));
const ListenPage = Loadable(lazy(() => import('pages/listen/ListenPage')));
const MeditationsList = Loadable(lazy(() => import('pages/meditation')));
const MeditationPage = Loadable(lazy(() => import('pages/meditation/MeditationPage')));
const Trainers = Loadable(lazy(() => import('pages/trainers')));
const Trainer = Loadable(lazy(() => import('pages/trainers/Trainer')));

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
    {
      path: '/listen',
      element: <ListenPage />,
    },
    {
      path: '/meditation',
      element: <MeditationsList />,
    },
    {
      path: '/meditation/:id',
      element: <MeditationPage />,
    },
    {
      path: '/trainers',
      element: <Trainers />,
    },
    {
      path: '/trainers/:id',
      element: <Trainer />,
    },
  ],
};

export default MainRoutes;
