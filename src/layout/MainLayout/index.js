import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Toolbar } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';

// types
import { openDrawer } from 'store/reducers/menu';
import MobileMenu from './MobileMenu/index';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
        <MobileMenu />
      </Box>
    </Box>
  );
};

export default MainLayout;
