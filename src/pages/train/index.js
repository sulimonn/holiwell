import React from 'react';

import { Box } from '@mui/material';
import Lessons from 'components/LessonsBase';
import CourseCard from './TrainCard';

const Train = () => {
  const [sortOption, setSortOption] = React.useState('default');
  const courses = [
    {
      id: 0,
      title: 'Тренировки для тела',
      description: 'string',
      path_to_cover: 'courses2.jpeg',
    },
    {
      id: 1,
      title: 'Выдающийся рельеф',
      description: '',
      path_to_cover: 'lesson.jpeg',
    },
    {
      id: 2,
      title: 'Тренировки для тела',
      description: 'string',
      path_to_cover: 'courses2.jpeg',
    },
    {
      id: 3,
      title: 'Выдающийся рельеф',
      description: 'string',
      path_to_cover: 'lesson.jpeg',
    },
  ];
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
