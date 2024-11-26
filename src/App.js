import { useLocation } from 'react-router-dom';
import React from 'react';

// project import
import AuthProvider from 'contexts/AuthContext';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: 'auto' });
  }, [location]);
  return (
    <ThemeCustomization>
      <AuthProvider>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </AuthProvider>
    </ThemeCustomization>
  );
};

export default App;
