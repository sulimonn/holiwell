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
const PrivacyPolicy = Loadable(lazy(() => import('pages/other/PrivacyPolicy')));
const Listening = Loadable(lazy(() => import('pages/listen')));
const ListenList = Loadable(lazy(() => import('pages/listen/ListenCourse')));
const ListenPage = Loadable(lazy(() => import('pages/listen/ListenPage')));
const Meditations = Loadable(lazy(() => import('pages/meditation')));
const MeditationsList = Loadable(lazy(() => import('pages/meditation/MeditationCourse')));
const MeditationPage = Loadable(lazy(() => import('pages/meditation/MeditationPage')));
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
      path: '/trainers',
      element: <Trainers />,
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
      path: '/meditation',
      element: <Meditations />,
    },
    {
      path: '/meditation/:courseId',
      element: <MeditationsList />,
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
      path: '/subscription/:id',
      element: <Subscription />,
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />,
    },
    // only authenticated users can access
    {
      path: '/meditation/:courseId/:lessonId',
      element: <PrivateRoute element={<MeditationPage />} />,
    },
    {
      path: '/listening/:courseId/:lessonId',
      element: <PrivateRoute element={<ListenPage />} />,
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
  ],
};
export default MainRoutes;
