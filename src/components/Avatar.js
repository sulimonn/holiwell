import React from 'react';

import { Box } from '@mui/material';
import Image from './Image';

const Avatar = ({ avatar }) => {
  if (!avatar) return null;
  return (
    <div>
      <Box
        width={{ xs: '170px', sm: '220px', md: '270px' }}
        height={{ xs: '170px', sm: '220px', md: '270px' }}
        borderRadius="50%"
        sx={{ overflow: 'hidden', border: '8px solid', borderColor: 'background.default' }}
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
