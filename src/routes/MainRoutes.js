import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'components/PrivateRoute';

// render - dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const Lessons = Loadable(lazy(() => import('pages/lessons')));
const ListenList = Loadable(lazy(() => import('pages/listen')));
const ListenPage = Loadable(lazy(() => import('pages/listen/ListenPage')));
const MeditationsList = Loadable(lazy(() => import('pages/meditation')));
const MeditationPage = Loadable(lazy(() => import('pages/meditation/MeditationPage')));
const Trainers = Loadable(lazy(() => import('pages/trainers')));
const Trainer = Loadable(lazy(() => import('pages/trainers/Trainer')));
const ProfilePage = Loadable(lazy(() => import('pages/profile')));
const EditProfile = Loadable(lazy(() => import('pages/profile/EditProfile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // everyone can access
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/lessons',
      element: <Lessons />,
    },
    {
      path: '/trainers',
      element: <Trainers />,
    },
    {
      path: '/trainers/:id',
      element: <Trainer />,
    },
    {
      path: '/listen',
      element: <ListenList />,
    },
    {
      path: '/meditation',
      element: <MeditationsList />,
    },
    // only authenticated users can access
    {
      path: '/meditation/:id',
      element: <PrivateRoute element={<MeditationPage />} />,
    },
    {
      path: '/listen/:id',
      element: <PrivateRoute element={<ListenPage />} />,
    },
    {
      path: '/profile',
      element: <PrivateRoute element={<ProfilePage />} />,
    },
    {
      path: '/profile/edit',
      element: <PrivateRoute element={<EditProfile />} />,
    },
  ],
};
export default MainRoutes;
