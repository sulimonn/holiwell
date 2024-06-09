import React from 'react';

// material-ui
import { Box } from '@mui/material';
import Hamburger from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'store/reducers/menu';

const MobileHeaderContent = ({ color }) => {
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = React.useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  React.useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);
  return (
    <Box
      alignItems="center"
      justifyContent="flex-end"
      position="absolute"
      top="0"
      right="0"
      zIndex={999}
      left="0"
      display={{ xs: 'flex', md: 'none' }}
    >
      <Hamburger toggled={open} toggle={handleDrawerToggle} color={color || 'white'} />
    </Box>
  );
};

export default MobileHeaderContent;
