import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SortLessons from 'components/SortLessons';

const Lessons = ({ title, children, sortOption, setSortOption }) => {
  return (
    <Box width="100%">
      <Box
        height={{ xs: 'auto', sm: 200 }}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'background.paper',
          pt: { xs: 2.3, md: 0 },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={{ xs: '400', md: '500' }}
          textTransform="uppercase"
          sx={{
            fontSize: { xs: '1.25rem', sm: 'inherit' },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          py={{ xs: 0, md: 3.5 }}
          mt={{ xs: 2, md: 4 }}
          sx={{
            borderBottom: { xs: 'none', md: '1px solid' },
            borderColor: 'divider',
          }}
          zIndex={1}
        >
          <Box
            width="min-content"
            position="absolute"
            height="100%"
            left={0}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            zIndex={7}
          >
            <SortLessons sortOption={sortOption} setSortOption={setSortOption} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              // border: '3px solid',
              // borderColor: 'divider',
              borderRadius: 1,
              py: 0.5,
              px: 10,
            }}
          >
            <Typography variant="h5" fontWeight="300">
              Курсы
            </Typography>
          </Box>
        </Box>
        <Box pt={{ xs: 0, md: 2 }} pb={6}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Lessons;
