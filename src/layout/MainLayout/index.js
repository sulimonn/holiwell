import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Snackbar, Alert } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';

// types
import { openDrawer, setPages } from 'store/reducers/menu';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import { closeSnackbar } from 'store/reducers/snackbar';
import { useGetAllCourseTypesQuery } from 'store/reducers/courses';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const dispatch = useDispatch();
  const { data: pages = [] } = useGetAllCourseTypesQuery();

  const { drawerOpen } = useSelector((state) => state.menu);
  const { snackbar } = useSelector((state) => state);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);

  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  useEffect(() => {
    if (pages.length > 0) {
      dispatch(setPages(pages));
    }
  }, [pages, dispatch]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', position: 'relative' }}>
        <Header open={open} handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: '100vw',
            minHeight: { xs: '100vh', sm: 'calc(100vh - 80px)' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pt: { xs: 0, sm: '80px' },
            pb: { xs: '70px', sm: 0 },
            overflow: 'hidden',
          }}
        >
          <Box width="100%" flex="1" display="flex" minHeight="100%">
            <Outlet />
          </Box>
          <Footer />
        </Box>
        <MobileMenu />
      </Box>
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => dispatch(closeSnackbar())}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity={snackbar.severity}
          sx={{ width: '100%', fontSize: '12px', fontWeight: '500', alignItems: 'center' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainLayout;
