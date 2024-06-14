import React from 'react';

// material-ui
import { Box, IconButton } from '@mui/material';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
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
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="end"
        color={color || 'white'}
        sx={{ m: 1.5 }}
      >
        <MenuOutlined style={{ color: color || 'white', fontSize: '2rem' }} />
      </IconButton>
    </Box>
  );
};

export default MobileHeaderContent;
