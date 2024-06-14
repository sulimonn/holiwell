import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Container, Button } from '@mui/material';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';
import LessonGirl from 'assets/images/girls/lesson.jpeg';
import PlayPauseButton from 'components/PlayPauseButton';
import LessonCard from './LessonCard';
import TrainersList from 'components/TrainersList';
import { subscribe } from 'store/reducers/subscription';
import Image from 'components/Image';

const Lesson = () => {
  const { isSubscribed } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [isPlaying, setPlaying] = React.useState(false);

  const courses = [
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
      path_to_cover: 'courses2.jpeg',
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
    {
      id: 2,
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
    {
      id: 3,
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
    {
      id: 4,
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
      path_to_cover: 'courses2.jpeg',
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
  ];

  const handleSubscription = () => {
    dispatch(subscribe());
  };

  return (
    <Box width="100%">
      <Box
        width="100%"
        position="relative"
        height={{ xs: '360px', sm: '450px', md: '500px' }}
        overflow="hidden"
        sx={{
          '& img': {
            objectPosition: { xs: 'center', md: 'top center' },
            mb: { xs: 3, md: 4 },
          },
        }}
      >
        <Image
          src={LessonGirl}
          alt="girl"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            filter: isSubscribed ? 'none' : 'brightness(0.6)',
            zIndex: 1,
          }}
        />
        {!isSubscribed && (
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
        )}
      </Box>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          gap={{ xs: 2, md: 4 }}
          textAlign="center"
          alignItems="center"
          py={{ xs: 3, md: 6 }}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography
            variant="h1"
            textTransform="uppercase"
            fontWeight={{ xs: 400, md: '500' }}
            fontSize={{ xs: 25, md: '2.5rem' }}
          >
            Стройность и энергия
          </Typography>
          <Typography variant="body1" fontWeight={{ xs: 100, sm: '300' }}>
            Курс тренировок
          </Typography>
          {isSubscribed ? (
            <Typography variant="h4" fontWeight="400">
              Дисциплина - ключ к успеху
            </Typography>
          ) : (
            <Button variant="contained" onClick={handleSubscription}>
              АКТИВИРОВАТЬ ДОСТУП
            </Button>
          )}
        </Box>
        <Box
          display="flex"
          py={10}
          gap={3}
          borderBottom="1px solid"
          borderColor="divider"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Box flex={1}>
            <Typography variant="h3" textTransform="uppercase">
              О курсе
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
        <Box
          display="flex"
          flexWrap="wrap"
          py={10}
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          borderBottom="1px solid"
          borderColor="divider"
        >
          {courses.map((course, index) => (
            <LessonCard
              key={course.id}
              course={course}
              index={index + 1}
              isSubscribed={isSubscribed}
            />
          ))}
        </Box>
      </Container>

      <TrainersList />
    </Box>
  );
};

export default Lesson;
