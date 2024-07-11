import React from 'react';

import { Box } from '@mui/material';
import Lessons from 'components/LessonsBase';
import CourseCard from 'pages/meditation/CourseCard';
import { useGetCourseByTypeQuery } from 'store/reducers/courses';

const Train = () => {
  const [sortOption, setSortOption] = React.useState('new');
  const { data: listening = {}, isSuccess } = useGetCourseByTypeQuery('listening');

  if (!isSuccess) return null;
  return (
    <Lessons title="СЛУШАЙ" sortOption={sortOption} setSortOption={setSortOption}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={{ xs: 2, md: 4 }}
        flexWrap="wrap"
        py={{ xs: 2, sm: 3, md: 5 }}
      >
        {listening.courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </Box>
    </Lessons>
  );
};

export default Train;
