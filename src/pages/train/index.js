import React from 'react';

import { Box, Typography, Tab, Container } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import CourseCard from './CourseCard';
import { useGetCourseByTypeQuery, useGetLessonsQuery } from 'store/reducers/courses';
import BaseLessonCard from './BaseLessonCard';
import Back from 'components/Back';
import SortLessons from 'components/SortLessons';

const Train = () => {
  const [value, setValue] = React.useState('2');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [sortOption, setSortOption] = React.useState('new');
  const {
    data: training = {},
    isSuccess,
    isFetching,
  } = useGetCourseByTypeQuery({ type: 'training', sort_by: sortOption });
  const { data: lessons = [] } = useGetLessonsQuery({
    course_type: 'training',
    sort_by: sortOption,
  });

  if (!isSuccess || isFetching) return null;
  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Box
          width="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: 'background.paper',
            py: 7,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={{ xs: '400', md: '500' }}
            textTransform="uppercase"
            sx={{
              fontSize: { xs: '1.25rem', md: '2.25rem' },
            }}
          >
            {training?.title}
          </Typography>
        </Box>
        <Container
          maxWidth="lg"
          sx={{ position: { xs: 'static', md: 'relative' }, mt: { xs: 7, md: 0 } }}
        >
          <Back title={training?.title} to="/" sx={{ display: { xs: 'block', md: 'none' } }} />
          <Box position={{ xs: 'static', md: 'relative' }} width="100%">
            <Box
              position={{ xs: 'static', md: 'absolute' }}
              sx={{ inset: 0, width: '100%', height: '100%' }}
            >
              <Box mx="auto" width="fit-content">
                <TabList
                  onChange={handleChange}
                  sx={{
                    backgroundColor: 'primary.lighter',
                    borderRadius: 2,
                    minHeight: 0,

                    '& .MuiTabs-indicator': {
                      height: '100%',
                      backgroundColor: 'background.default',
                      zIndex: 0,
                      borderRadius: 2,
                      border: '5px solid',
                      borderColor: 'primary.lighter',
                    },
                  }}
                >
                  <Tab
                    label="Уроки"
                    value="2"
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      fontWeight: 300,
                      px: { xs: 8, sm: 13 },
                      py: { xs: 1, sm: 1.5 },
                      minHeight: 0,
                      zIndex: 1,
                    }}
                  />
                  <Tab
                    label="Курсы"
                    value="1"
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      fontWeight: 300,
                      px: { xs: 8, sm: 13 },
                      py: { xs: 1, sm: 1.5 },
                      minHeight: 0,
                      zIndex: 1,
                    }}
                  />
                </TabList>
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              py={{ xs: 0, md: 3.5 }}
              mt={{ xs: 2, md: 4 }}
              sx={{
                borderBottom: { xs: 'none', md: '1px solid' },
                borderColor: { xs: 'transparent', md: 'divider' },
              }}
              gap={2}
            >
              <SortLessons sortOption={sortOption} setSortOption={setSortOption} />
              <Typography variant="body2">
                {value === '1'
                  ? training.courses.length +
                    (training.courses.length === 1
                      ? ' курс'
                      : training.courses.length < 5
                        ? ' курса'
                        : ' курсов')
                  : lessons.length +
                    (lessons.length === 1
                      ? ' урок'
                      : training.courses.length < 5
                        ? ' урока'
                        : ' уроков')}
              </Typography>
            </Box>
          </Box>
          <Box pt={{ xs: 0, md: 2 }} pb={6}>
            <TabPanel sx={{ p: 0 }} value="1">
              <Box
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                gridTemplateRows={{ xs: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }}
                columnGap={{ xs: 1, md: 4 }}
                rowGap={{ xs: 2, md: 4 }}
                flexWrap="wrap"
                py={{ xs: 2, sm: 3, md: 5 }}
              >
                {training.courses.map((course) => (
                  <CourseCard
                    course={course}
                    key={course.id}
                    isSubscribed={isSubscribed}
                    setIsSubscribed={setIsSubscribed}
                  />
                ))}
              </Box>
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="2">
              <Box
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                gridTemplateRows={{ xs: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }}
                columnGap={{ xs: 1, md: 4 }}
                rowGap={{ xs: 2, md: 4 }}
                flexWrap="wrap"
                py={{ xs: 2, sm: 3, md: 5 }}
              >
                {lessons.map((lesson) => (
                  <BaseLessonCard
                    key={lesson.id}
                    course={lesson}
                    isSubscribed={isSubscribed}
                    setIsSubscribed={setIsSubscribed}
                  />
                ))}
              </Box>
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </TabContext>
  );
};

export default Train;
