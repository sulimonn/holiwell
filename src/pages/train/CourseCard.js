import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import Image from 'components/Image';
import { useSelector } from 'react-redux';

const CourseCard = ({ course = {} }) => {
  const { isSubscribed } = useSelector((state) => state.subscription);
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
        maxWidth={{ xs: '100%', md: '100%' }}
        height={{ xs: '127px', md: '220px' }}
        overflow="hidden"
        py={1.5}
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
      <Typography variant="h4"> {course.title}</Typography>
      <Typography variant="body2" fontWeight="100" mt={0.5}>
        {course.lessons[0]?.trainer.first_name} {course.lessons[0]?.trainer.last_name}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/subscription/${course.id}`}
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 1, mt: 0.5 }}
      >
        <Typography
          variant="h4"
          fontSize={{ xs: '12px', sm: '16px' }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          КУПИТЬ КУРС
        </Typography>
        <Typography
          variant="h4"
          fontSize={{ xs: '12px', sm: '16px' }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {course?.price_cource} ₽
        </Typography>
      </Button>
    </Box>
  );
};

export default CourseCard;
