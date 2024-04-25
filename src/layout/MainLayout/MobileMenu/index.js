import React from 'react';

// material-ui
import { Box } from '@mui/material';

const MobileMenu = () => {
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
    ></Box>
  );
};

export default MobileMenu;
