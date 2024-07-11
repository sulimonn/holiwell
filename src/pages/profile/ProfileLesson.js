import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import Image from 'components/Image';
import { typeOfLesson } from 'utils/other';

const ProfileLesson = ({ lesson }) => {
  const typoflesson = typeOfLesson(lesson.course_type_slug);
  return (
    <Box
      minWidth={{ xs: 194, sm: 250 }}
      component={Link}
      to={`/${lesson.course_type_slug}/${lesson.id}`}
      sx={{ textDecoration: 'none' }}
    >
      <Box width="100%" height={{ xs: 194, sm: 200 }}>
        <Image
          src={lesson.path_to_cover.replace(process.env.REACT_APP_BASE_URL, '')}
          alt={lesson.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box mt={1}>
        <Typography variant="body2" color="text.primary" fontWeight="100">
          {typoflesson}
        </Typography>
        <Typography variant="h4" color="text.primary" mt={0.5}>
          {lesson.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileLesson;
