import React from 'react';

import { Box } from '@mui/material';
import Image from './Image';

const Avatar = ({ avatar, border }) => {
  if (!avatar) return null;
  return (
    <div>
      <Box
        width={{ xs: '165px', sm: '220px', md: '270px' }}
        height={{ xs: '165px', sm: '220px', md: '270px' }}
        borderRadius="50%"
        sx={{
          overflow: 'hidden',
          border: border ? '8px solid' : 'none',
          borderColor: 'background.default',
        }}
      >
        <Image
          src={require(`assets/images/users/${avatar}`)}
          alt="team"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </div>
  );
};

export default Avatar;
