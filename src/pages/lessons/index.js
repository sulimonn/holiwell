import React from 'react';

// material-ui
import { Box, Typography, Container, Button } from '@mui/material';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';
import LessonGirl from 'assets/images/girls/lesson.jpeg';
import PlayPauseButton from 'components/PlayPauseButton';
import CourseCard from 'components/CourseCard';
import { useGetCoursesQuery } from 'store/reducers/courses';

const Lessons = () => {
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [isPlaying, setPlaying] = React.useState(false);

  const {
    data: courses = [
      {
        id: 0,
        title: 'Урок 1 : Название урока',
        description: 'string',
        trainer: {
          id: 0,
          first_name: 'Имя',
          last_name: 'Фамилия',
          description: 'string',
          path_to_avatar: 'string',
          path_to_background: 'string',
        },
        course_id: 0,
        path_to_cover: 'lesson.jpeg',
        path_to_video: 'string',
        path_to_audio:
          'https://muzma.net/uploads/music/2023/01/Darkvidez_The_Hills_x_The_Color_Violet_x_Creepin_Tiktok_Remix.mp3',
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
  } = useGetCoursesQuery();
  return (
    <Box>
      <Box
        width="100vw"
        position="relative"
        height={{ xs: '360px', sm: '450px', md: '500px' }}
        overflow="hidden"
        mb={{ xs: '40', sm: '70px', md: '100px' }}
      >
        <img
          src={LessonGirl}
          alt="girl"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            position: 'absolute',
            top: '-20%',
            filter: 'brightness(0.6)',
            zIndex: 1,
          }}
        />
        <Box
          position="relative"
          zIndex={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1.5}
          height="100%"
        >
          <LockedIcon fontSize="large" />
          <Typography
            color="primary.contrastText"
            variant="h4"
            fontWeight="400"
            textTransform="uppercase"
          >
            Разблокируйте курс
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          textAlign="center"
          alignItems="center"
          pb={{ xs: 3, md: 6 }}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography variant="h1" textTransform="uppercase">
            Стройность и энергия
          </Typography>
          <Typography variant="body1" fontWeight="300">
            Курс тренировок
          </Typography>
          <Button variant="contained">АКТИВИРОВАТЬ ДОСТУП</Button>
        </Box>
        <Box display="flex" py={10} gap={3} borderBottom="1px solid" borderColor="divider">
          <Box flex={1}>
            <Typography variant="h3" textTransform="uppercase">
              О приложении
            </Typography>
            <Typography variant="h5" component="p" sx={{ mt: 1.5 }}>
              Не ограничивай себя в движении,
              <br /> В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут
              тебе энергию для реализации твоей цели 🎯
            </Typography>
          </Box>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => setPlaying(!isPlaying)}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                borderRadius: '50px',
                border: '1px solid',
                borderColor: 'divider',
                px: 1,
                py: 1,
              }}
              fullWidth
            >
              <PlayPauseButton isPlaying={isPlaying} sx={{ width: '50px', height: '50px' }} />
              <Typography variant="body1" textTransform="none" sx={{ ml: 1 }}>
                Аудио запись
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} py={10}>
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Lessons;
