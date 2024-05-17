import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout/index';

const Page404 = Loadable(lazy(() => import('pages/404')));

const Minimal = {
  path: '*',
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <Page404 />,
    },
  ],
};
export default Minimal;
