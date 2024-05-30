import React from 'react';

// material-ui
import { Box, Typography } from '@mui/material';

// assets
import Icon from '@ant-design/icons';
import Profile from 'assets/images/icons/profile';
import home from 'assets/images/icons/home';
import './style.css';

const MobileMenu = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const ProfileIcon = ({ ...others }) => (
    <Icon
      component={(e) => <Profile isHovered={isHovered} setIsHovered={setIsHovered} />}
      {...others}
    />
  );
  // eslint-disable-next-line
  const HomeIcon = ({ ...others }) => <Icon component={home} {...others} />;
  return (
    <Box
      height="70px"
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
          <button className="mobile-menu">
            <Box width="32px" height="32px" component={home} />
          </button>
          <Typography variant="body2" fontWeight="400" color="text.secondary">
            Домой
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <button
            className="mobile-menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            onClick={() => setIsHovered(!isHovered)}
          >
            <ProfileIcon width="32px" height="32px" />
          </button>
          <Typography variant="body2" fontWeight="400" color="text.secondary">
            Профиль
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileMenu;
