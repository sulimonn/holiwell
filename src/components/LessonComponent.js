import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SortLessons from 'components/SortLessons';

const Lesson = ({ title, children, sortOption, setSortOption }) => {
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
        }}
      >
        <Typography variant="h3">{title}</Typography>
      </Box>
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          py={3.5}
          mt={4}
          sx={{
            borderBottom: '1px solid',
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
        <Box pt={2} pb={6}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Lesson;
