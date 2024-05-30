import React from 'react';
import { Container, Box, Typography, Button, Avatar } from '@mui/material';

// Sample lesson data
const lesson = {
  id: 0,
  title: 'МЕДИТАЦИЯ 1 : НАЗВАНИЕ',
  description:
    'Не ограничивай себя в движении. В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
  trainer: {
    id: 0,
    first_name: 'Имя',
    last_name: 'Фамилия',
    description:
      'Откройте для себя преимущества регулярной медитации на нашем уроке, направленной на улучшение физического и эмоционального благополучия.',

    path_to_avatar: 'avatar-1.png',
    path_to_background: 'background-1.jpeg',
  },
  course_id: 0,
  path_to_cover: 'courses2.jpeg',
  path_to_video: 'https://youtu.be/D_hoEwdRo1I?si=aRmctkYF68TxHif0',
  path_to_audio: '/path/to/audio.mp3',
  links_before: [],
  links_after: [],
};

const MeditationPage = () => {
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
          src={require('assets/images/girls/' + lesson.path_to_cover)}
          alt="girl"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            position: 'absolute',
            top: '-20%',
            zIndex: 1,
          }}
        />
      </Box>
      <Container maxWidth="md">
        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            {lesson.title}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            {lesson.trainer.first_name} {lesson.trainer.last_name} - 34:42
          </Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
              СМОТРЕТЬ
            </Button>
            <Button variant="outlined" color="primary">
              В ИЗБРАННОЕ
            </Button>
          </Box>

          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              ОПИСАНИЕ УРОКА
            </Typography>
            <Typography variant="body1" paragraph>
              {lesson.description}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar
              alt={lesson.trainer.first_name}
              src={lesson.trainer.path_to_avatar}
              style={{ marginRight: '10px' }}
            />
            <Box>
              <Typography variant="subtitle1">Тренер урока</Typography>
              <Typography variant="h6">
                {lesson.trainer.first_name} {lesson.trainer.last_name}
              </Typography>
              <Typography variant="body2">{lesson.trainer.description}</Typography>
              <Button variant="text" color="primary">
                ПОДРОБНЕЕ
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MeditationPage;
