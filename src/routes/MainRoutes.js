import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'components/PrivateRoute';

// render - dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const Training = Loadable(lazy(() => import('pages/train')));
const TrainingCourses = Loadable(lazy(() => import('pages/train/Courses')));
const TrainingLesson = Loadable(lazy(() => import('pages/train/TrainingLesson')));
const Subscription = Loadable(lazy(() => import('pages/subscription')));
const SubscriptionToMedLis = Loadable(lazy(() => import('pages/subscription/medlis')));
const PrivacyPolicy = Loadable(lazy(() => import('pages/other/PrivacyPolicy')));
const Listening = Loadable(lazy(() => import('pages/listen')));
const ListenList = Loadable(lazy(() => import('pages/listen/ListenCourse')));
const Meditations = Loadable(lazy(() => import('pages/meditation')));
const MeditationsList = Loadable(lazy(() => import('pages/meditation/MeditationCourse')));
const Trainers = Loadable(lazy(() => import('pages/trainers')));
const Trainer = Loadable(lazy(() => import('pages/trainers/Trainer')));
const ProfilePage = Loadable(lazy(() => import('pages/profile')));
const EditProfile = Loadable(lazy(() => import('pages/profile/EditProfile')));
const Day = Loadable(lazy(() => import('pages/calendar/Day')));
const Calendar = Loadable(lazy(() => import('pages/calendar/Calendar')));

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
      path: '/trainers/:id',
      element: <Trainer />,
    },
    {
      path: '/listening',
      element: <Listening />,
    },
    {
      path: '/listening/:courseId',
      element: <ListenList />,
    },
    {
      path: '/training',
      element: <Training />,
    },
    {
      path: '/training/:courseId',
      element: <TrainingCourses />,
    },
    {
      path: '/subscription/:type/:id',
      element: <SubscriptionToMedLis />,
    },
    {
      path: '/subscription/:type',
      element: <Subscription />,
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />,
    },
    {
      path: '/trainers',
      element: <Trainers />,
    },
    {
      path: '/training/:courseId/:lessonId',
      element: <PrivateRoute element={<TrainingLesson />} />,
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
      path: '/calendar',
      element: <PrivateRoute element={<Calendar />} />,
    },
    {
      path: '/calendar/:date',
      element: <PrivateRoute element={<Day />} />,
    },
    {
      path: '/:slug',
      element: <Meditations />,
    },
    {
      path: '/:slug/:courseId',
      element: <MeditationsList />,
    },
  ],
};
export default MainRoutes;
