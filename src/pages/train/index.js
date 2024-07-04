import React from 'react';

import { Box } from '@mui/material';
import Lessons from 'components/LessonsBase';
import CourseCard from './TrainCard';
import { useGetCoursesQuery } from 'store/reducers/courses';

const Train = () => {
  const [sortOption, setSortOption] = React.useState('default');
  const { data: courses = [] } = useGetCoursesQuery();
  return (
    <Lessons title="ТРЕНИРУЙСЯ" sortOption={sortOption} setSortOption={setSortOption}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={4}
        flexWrap="wrap"
        py={{ xs: 2, sm: 3, md: 5 }}
      >
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </Box>
    </Lessons>
  );
};

export default Train;
