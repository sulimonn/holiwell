import React from 'react';

import { Box } from '@mui/material';
import CourseTypeBase from 'components/CourseTypeBase';
import CourseCard from 'pages/meditation/CourseCard';
import { useGetCourseByTypeQuery } from 'store/reducers/courses';

const Train = () => {
  const [sortOption, setSortOption] = React.useState('new');
  const { data: listening = {}, isSuccess } = useGetCourseByTypeQuery({
    type: 'listening',
    sort_by: sortOption,
  });

  if (!isSuccess) return null;
  return (
    <CourseTypeBase title={listening.title} sortOption={sortOption} setSortOption={setSortOption}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={{ xs: 2, md: 4 }}
        flexWrap="wrap"
        py={{ xs: 2, sm: 3, md: 5 }}
      >
        {listening.courses.map(
          (course) => course.lessons.length > 0 && <CourseCard course={course} key={course.id} />,
        )}
      </Box>
    </CourseTypeBase>
  );
};

export default Train;
