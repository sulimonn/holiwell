import React from 'react';

import { Box, Typography } from '@mui/material';

const TeamCard = ({ member }) => {
  console.log(member);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        width={{ xs: '170px', sm: '220px', md: '270px' }}
        height={{ xs: '170px', sm: '220px', md: '270px' }}
        borderRadius="50%"
        sx={{ overflow: 'hidden' }}
      >
        <img
          src={require('assets/images/users/' + member.avatar + '')}
          alt="team"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Typography variant="h5" fontWeight="300" textAlign="center" mt={1}>
        {member.first_name} {member.last_name}
      </Typography>
    </Box>
  );
};

export default TeamCard;
