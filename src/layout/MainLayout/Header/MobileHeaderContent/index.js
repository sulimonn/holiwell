import React from 'react';

// material-ui
import { Box } from '@mui/material';
import Hamburger from 'hamburger-react';

const MobileHeaderContent = ({ handleDrawerToggle, open }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      position="fixed"
      top="0"
      right="0"
      zIndex={999}
      left="0"
    >
      <Hamburger toggled={open} toggle={handleDrawerToggle} />
    </Box>
  );
};

export default MobileHeaderContent;
