import React from 'react';
import { Link } from 'react-router-dom';
import { useGetLessonQuery } from 'store/reducers/courses';

import { Box, Typography } from '@mui/material';
import Image from 'components/Image';

const PrevNextLessonCard = ({ linked_lesson, title }) => {
  const { data: lesson = {}, isSuccess } = useGetLessonQuery(linked_lesson.linked_lesson_id);
  if (!isSuccess) return null;
  return (
    <Box width="100%" alignSelf={title === 'Предыдущая тренировка' ? 'flex-start' : 'flex-end'}>
      <Typography
        variant="h4"
        textAlign={{ xs: 'left', md: 'center' }}
        fontWieght={400}
        mb={{ xs: 1.5, md: 2 }}
      >
        {title}
      </Typography>
      <Link
        to={`/${lesson.course_type_slug}/${lesson.course_id}/${lesson.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box width="100%">
          <Box width="100%" height={{ xs: '194px', md: '270px' }}>
            <Image
              src={process.env.REACT_APP_BASE_URL + lesson.path_to_cover}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Typography variant="body2" fontWieght={100} mt={1}>
            {lesson.title}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default PrevNextLessonCard;
