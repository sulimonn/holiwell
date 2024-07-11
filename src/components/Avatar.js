import React from 'react';

import { Box } from '@mui/material';
import Image from './Image';

const Avatar = ({ avatar, border }) => {
  if (!avatar) return null;
  //const ava = avatar.replace('http://154.194.52.246', '');
  return (
    <div>
      <Box
        width={{ xs: '160px', sm: '220px', md: '270px' }}
        height={{ xs: '160px', sm: '220px', md: '270px' }}
        borderRadius="50%"
        sx={{
          overflow: 'hidden',
          border: border ? { xs: '5px solid', sm: '8px solid' } : 'none',
          borderColor: { xs: 'background.default', sm: 'background.default' },
        }}
      >
        <Image
          src={process.env.REACT_APP_BASE_URL + avatar}
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>
    </div>
  );
};

export default Avatar;
