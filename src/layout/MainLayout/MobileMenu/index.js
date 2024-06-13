import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { Box, Typography, Button } from '@mui/material';

// assets
import Icon from '@ant-design/icons';
import Profile from 'assets/images/icons/profile';
import ProfileFilled from 'assets/images/icons/profileFilled';
import home from 'assets/images/icons/home';
import homeFilled from 'assets/images/icons/homeFilled';
import './style.css';
import { useAuth } from 'contexts/AuthContext';

const MobileMenu = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isActive, setisActive] = React.useState({
    profile: false,
    home: false,
  });
  const ProfileIcon = ({ ...others }) => (
    <Icon component={isActive.profile ? ProfileFilled : Profile} {...others} />
  );
  const HomeIcon = ({ ...others }) => (
    <Icon component={isActive.home ? homeFilled : home} {...others} />
  );
  React.useEffect(() => {
    setisActive({
      profile: pathname.includes('/profile'),
      home: pathname === '/',
    });
  }, [pathname]);
  return (
    <Box
      borderTop="1px solid"
      borderColor="divider"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex={999}
      display={{ xs: 'block', md: 'none' }}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={() => {
              navigate('/');
            }}
            name="home"
            startIcon={<HomeIcon width="32px" height="32px" style={{ margin: '0 auto' }} />}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 0.5,
              '& .MuiButton-startIcon': {
                width: 'min-content',
                m: 0,
              },
            }}
          >
            <Typography
              variant="body2"
              fontWeight="400"
              color={isActive.home ? 'primary.main' : 'text.secondary'}
              textTransform="none"
            >
              Домой
            </Typography>
          </Button>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Button
            className="mobile-menu"
            onClick={() => {
              navigate(isAuthenticated ? '/profile' : '/login');
            }}
            name="profile"
            startIcon={<ProfileIcon width="32px" height="32px" style={{ margin: '0 auto' }} />}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 0.5,
              '& .MuiButton-startIcon': {
                width: 'min-content',
                m: 0,
              },
              '&:hover .profile-outlined .profile-outlined-path-1, &:active .profile-outlined .profile-outlined-path-1, &:focus .profile-outlined .profile-outlined-path-1, &:focus-within .profile-outlined .profile-outlined-path-1':
                {
                  stroke: 'black !important',
                },
              '&:hover .profile-outlined .profile-outlined-path-2, &:active .profile-outlined .profile-outlined-path-2, &:focus .profile-outlined .profile-outlined-path-2, &:focus-within .profile-outlined .profile-outlined-path-2':
                {
                  stroke: 'white !important',
                },
              '&:hover .MuiTypography-root, &:active .MuiTypography-root, &:focus .MuiTypography-root, &:focus-within .MuiTypography-root':
                {
                  color: 'black !important',
                },
            }}
          >
            <Typography
              variant="body2"
              fontWeight="400"
              color={isActive.profile ? 'primary.main' : 'text.secondary'}
              textTransform="none"
            >
              Профиль
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileMenu;
