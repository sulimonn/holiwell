import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Drawer } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle, window }) => {
  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1300, display: { xs: 'block', md: 'none' } }}
      aria-label="mailbox folders"
    >
      <Box
        position="fixed"
        zIndex={1299}
        sx={{ display: { xs: 'block', lg: 'none' } }}
        width="100%"
        height={open ? '100vh' : 0}
        onClick={() => handleDrawerToggle(false)}
      ></Box>
      <Drawer
        container={container}
        variant="temporary"
        anchor="bottom"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          zIndex: 1300,

          backgroundColor: 'transparent',
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent',
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100vw',
            height: 'max-content',
            backgroundImage: 'none',
            boxShadow: 'inherit',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            py: 1,
          },
        }}
      >
        {open && drawerHeader}
        {open && drawerContent}
      </Drawer>
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default MainDrawer;
