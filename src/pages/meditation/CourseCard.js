import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import Image from 'components/Image';

const CourseCard = ({ course = {} }) => {
  const navigate = useNavigate();
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        width="100%"
        height="100%"
        component={Link}
        to={`/${course.course_type_slug}/${course.id}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box
          width="100%"
          height={{ xs: '235px', md: '220px' }}
          overflow="hidden"
          my={1.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={process.env.REACT_APP_BASE_URL + course.path_to_cover}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', flex: 1 }}
          />
        </Box>
        <Typography variant="h4" textAlign={{ xs: 'center', md: 'left' }}>
          {course.title}
        </Typography>
        <Typography variant="h4" fontWeight="300" textAlign={{ xs: 'center', md: 'left' }}>
          {course.price_cource} ₽
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: '100%', mt: 1 }}
        onClick={() => navigate(`/subscription/${course.course_type_slug}/${course.id}`)}
      >
        <Typography variant="h4" textAlign="center" fontSize={{ xs: '14px', md: 'inherit' }}>
          КУПИТЬ
        </Typography>
      </Button>
    </Box>
  );
};

export default CourseCard;
