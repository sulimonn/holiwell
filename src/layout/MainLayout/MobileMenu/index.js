import React from 'react';

// material-ui
import { Box } from '@mui/material';

// assets
import Icon from '@ant-design/icons';
import profile from 'assets/images/icons/profile';
import home from 'assets/images/icons/home';
import './style.css';

const MobileMenu = () => {
  const ProfileIcon = ({ ...others }) => <Icon component={profile} {...others} />;
  const HomeIcon = ({ ...others }) => <Icon component={home} {...others} />;
  console.log(HomeIcon);
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
      sx={{ backgroundColor: 'background.paper' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <button className="mobile-menu">
          <Box width="32px" height="32px" component={home} />
        </button>
        <button className="mobile-menu">
          <Box width="32px" height="32px" component={ProfileIcon} />
        </button>
      </Box>
    </Box>
  );
};

export default MobileMenu;
