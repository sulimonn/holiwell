// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AuthComponent from 'components/AuthComponent';

import { useLocation } from 'react-router-dom';
import React from 'react';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: 'auto' });
  }, [location]);
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AuthComponent>
          <Routes />
        </AuthComponent>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
