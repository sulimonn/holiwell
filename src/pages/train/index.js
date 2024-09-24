import React from 'react';

import { Box } from '@mui/material';
import Lessons from 'components/LessonsBase';
import CourseCard from './CourseCard';
import { useGetCourseByTypeQuery } from 'store/reducers/courses';

const Train = () => {
  const [sortOption, setSortOption] = React.useState('new');
  const { data: training = {}, isSuccess } = useGetCourseByTypeQuery('training');
  console.log(training);

  if (!isSuccess) return null;
  return (
    <Lessons title="ТРЕНИРУЙСЯ" sortOption={sortOption} setSortOption={setSortOption}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={{ xs: 2, md: 4 }}
        flexWrap="wrap"
        py={{ xs: 2, sm: 3, md: 5 }}
      >
        {training.courses.map(
          (course) => course.lessons.length > 0 && <CourseCard course={course} key={course.id} />,
        )}
      </Box>
    </Lessons>
  );
};

export default Train;
