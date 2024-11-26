import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, IconButton } from '@mui/material';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'store/reducers/menu';
import Logo from 'components/Logo/Logo';

const MobileHeaderContent = ({ color }) => {
  const dispatch = useDispatch();
  const [height, setHeight] = React.useState(0);

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

  React.useEffect(() => {
    const handleScroll = () => {
      setHeight(window.scrollY);
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      zIndex={999}
      sx={{
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        transition: 'all 0.3s ease',
        py: 1,
        backgroundColor: height > 150 ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
        backdropFilter: height > 150 ? 'blur(5px)' : 'none',
      }}
    >
      <Box width={{ xs: '180px', sm: '230px' }} mx="auto" mt={0.5} component={Link} to="/">
        <Logo mode={height > 150 ? 'dark' : color === 'black' ? 'dark' : 'light'} />
      </Box>

      <Box position="absolute" top="0" right="0" zIndex={999}>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="end"
          color={color || 'white'}
          sx={{ m: 1 }}
        >
          <MenuOutlined
            style={{ color: color || height > 150 ? 'black' : 'white', fontSize: '2rem' }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MobileHeaderContent;
