import React from 'react';
import { Box } from '@mui/material';
import TeamCard from './TeamCard';

const TeamList = ({ team }) => {
  return (
    <Box
      sx={{
        overflowX: 'scroll',
      }}
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        justifyContent="space-between"
        gap={4}
        overflow="visible"
        position="relative"
      >
        {team.map((item) => (
          <TeamCard key={item.id} member={item} />
        ))}
      </Box>
    </Box>
  );
};

export default TeamList;
