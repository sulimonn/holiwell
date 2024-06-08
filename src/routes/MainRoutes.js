import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'components/PrivateRoute';

// render - dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const Train = Loadable(lazy(() => import('pages/train')));
const TrainPage = Loadable(lazy(() => import('pages/train/Lesson')));
const Subscription = Loadable(lazy(() => import('pages/subscription')));
const PrivacyPolicy = Loadable(lazy(() => import('pages/other/PrivacyPolicy')));
const ListenList = Loadable(lazy(() => import('pages/listen')));
const ListenPage = Loadable(lazy(() => import('pages/listen/ListenPage')));
const MeditationsList = Loadable(lazy(() => import('pages/meditation')));
const MeditationPage = Loadable(lazy(() => import('pages/meditation/MeditationPage')));
const Trainers = Loadable(lazy(() => import('pages/trainers')));
const Trainer = Loadable(lazy(() => import('pages/trainers/Trainer')));
const ProfilePage = Loadable(lazy(() => import('pages/profile')));
const EditProfile = Loadable(lazy(() => import('pages/profile/EditProfile')));
const Day = Loadable(lazy(() => import('pages/calendar/Day')));

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
    {
      path: '/training',
      element: <Train />,
    },
    {
      path: '/training/:id',
      element: <TrainPage />,
    },
    {
      path: '/subscription/:id',
      element: <Subscription />,
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />,
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
    {
      path: '/calendar/:date',
      element: <PrivateRoute element={<Day />} />,
    },
  ],
};
export default MainRoutes;
