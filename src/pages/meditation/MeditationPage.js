import React, { useState } from 'react';

import { Box, Container } from '@mui/material';
import VideoPlayer from './VideoPlayer';

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
  path_to_video:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  path_to_audio: '/path/to/audio.mp3',
  links_before: [],
  links_after: [],
};

const MeditionPage = () => {
  const [duration, setDuration] = useState(null);

  return (
    <Container maxWidth="lg">
      <VideoPlayer
        path_to_video={lesson.path_to_video}
        duration={duration}
        setDuration={setDuration}
      />
      <Box py={5}></Box>
    </Container>
  );
};

export default MeditionPage;
