import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

const TeamCard = ({ member }) => {
  return (
    <Link to={`/trainers/${member.id}`} style={{ textDecoration: 'none' }}>
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
        <Typography variant="h5" fontWeight="300" textAlign="center" mt={1} color="primary.main">
          {member.first_name} {member.last_name}
        </Typography>
      </Box>
    </Link>
  );
};

export default TeamCard;
