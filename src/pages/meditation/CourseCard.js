import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import Image from 'components/Image';
import { useSelector } from 'react-redux';

const CourseCard = ({ course = {} }) => {
  const { isSubscribed } = useSelector((state) => state.subscription);
  const navigate = useNavigate();
  const props = isSubscribed
    ? {
        component: Link,
        to: `/${course.course_type_slug}/${course.id}`,
        sx: { textDecoration: 'none', color: 'inherit' },
      }
    : {};

  return (
    <Box width="100%" {...props}>
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
        1990 ₽
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: '100%', mt: 1 }}
        onClick={() => navigate(`/subscription/${course.id}`)}
      >
        <Typography variant="h4" textAlign="center">
          КУПИТЬ
        </Typography>
      </Button>
    </Box>
  );
};

export default CourseCard;
