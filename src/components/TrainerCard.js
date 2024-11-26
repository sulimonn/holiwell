import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import Avatar from './Avatar';

const TeamCard = ({ trainer }) => {
  return (
    <Link to={`/trainers/${trainer.id}`} style={{ textDecoration: 'none' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          width={{ xs: '120px', sm: '220px', md: '270px' }}
          height={{ xs: '120px', sm: '220px', md: '270px' }}
          avatar={trainer.path_to_avatar}
        />
        <Typography
          variant="h5"
          fontWeight="300"
          textAlign="center"
          mt={1}
          color="primary.main"
          sx={{ whiteSpace: 'wrap', maxWidth: { xs: '160px', sm: '270px' } }}
        >
          {trainer.first_name} {trainer.last_name}
        </Typography>
      </Box>
    </Link>
  );
};

export default TeamCard;
