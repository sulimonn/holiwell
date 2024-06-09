import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SortLessons from 'components/SortLessons';
import Back from './Back';

const Lessons = ({ title, children, sortOption, setSortOption }) => {
  return (
    <Box width="100%">
      <Box
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'background.paper',
          py: 7,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={{ xs: '400', md: '500' }}
          textTransform="uppercase"
          sx={{
            fontSize: { xs: '1.25rem', md: '2.25rem' },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Container
        maxWidth="lg"
        sx={{ position: { xs: 'static', md: 'relative' }, mt: { xs: 7, md: 0 } }}
      >
        <Back title={title} to="/" sx={{ display: { xs: 'block', md: 'none' } }} />
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-start"
          py={{ xs: 0, md: 3.5 }}
          mt={{ xs: 2, md: 4 }}
          sx={{
            borderBottom: { xs: 'none', md: '1px solid' },
            borderColor: { xs: 'transparent', md: 'divider' },
          }}
        >
          <SortLessons sortOption={sortOption} setSortOption={setSortOption} />
        </Box>
        <Box pt={{ xs: 0, md: 2 }} pb={6}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Lessons;
