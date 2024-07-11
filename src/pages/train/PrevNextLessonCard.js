import React from 'react';
import { useGetLessonQuery } from 'store/reducers/courses';

import { Box, Typography } from '@mui/material';
import Image from 'components/Image';

const PrevNextLessonCard = ({ linked_lesson, title }) => {
  const { data: lesson = {}, isSuccess } = useGetLessonQuery(linked_lesson.linked_lesson_id);
  if (!isSuccess) return null;
  return (
    <Box width="100%">
      <Typography variant="h4" textAlign="center">
        {title}
      </Typography>
      <Box width="100%" height={{ xs: '194px', md: '270px' }}>
        <Image src={process.env.REACT_APP_BASE_URL + lesson.path_to_cover} />
      </Box>
    </Box>
  );
};

export default PrevNextLessonCard;
