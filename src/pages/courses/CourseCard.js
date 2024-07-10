import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import Image from 'components/Image';
import { useSelector } from 'react-redux';

const CourseCard = ({
  course = {
    id: 0,
    title: 'string',
    description: 'string',
    path_to_cover: 'courses2.jpeg',
    lessons: [
      {
        id: 0,
        title: 'string',
        description: 'string',
        trainer: {
          id: 0,
          first_name: 'string',
          last_name: 'string',
          description: 'string',
          path_to_avatar: 'string',
          path_to_background: 'string',
        },
        course_id: 0,
        path_to_cover: 'string',
        path_to_video: 'string',
        path_to_audio: 'string',
        links_before: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
        links_after: [
          {
            id: 0,
            lesson_id: 0,
            linked_lesson_id: 0,
          },
        ],
      },
    ],
  },
}) => {
  const { isSubscribed } = useSelector((state) => state.subscription);
  const props = isSubscribed
    ? {
        component: Link,
        to: `/${course.course_type_slug}`,
        sx: { textDecoration: 'none', color: 'inherit' },
      }
    : {};
  return (
    <Box width="100%" {...props}>
      <Typography variant="h4">{course.title}</Typography>
      <Box
        width="100%"
        height="220px"
        overflow="hidden"
        my={1.5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={course.path_to_cover}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', flex: 1 }}
        />
      </Box>
      {!isSubscribed && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/subscription/${course.id}`}
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h4">КУПИТЬ КУРС</Typography>
          <Typography variant="h4">1990 ₽</Typography>
        </Button>
      )}
    </Box>
  );
};

export default CourseCard;
