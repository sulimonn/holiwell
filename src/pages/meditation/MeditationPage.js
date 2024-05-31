import React, { useState } from 'react';

import { Button } from '@mui/material';

import LessonPageBase from 'components/LessonPageBase';
import VideoPlayer from './VideoPlayer';

const lesson = {
  id: 0,
  title: 'МЕДИТАЦИЯ 1 : НАЗВАНИЕ',
  description:
    'Не ограничивай себя в движении.\n\n В здоровом теле здоровый дух. Регулярная практика и позитивный настрой дадут тебе энергию для реализации твоих целей.',
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
    <LessonPageBase
      cover={
        <VideoPlayer
          path_to_video={lesson.path_to_video}
          duration={duration}
          setDuration={setDuration}
        />
      }
      duration={duration}
      lesson={lesson}
      btnContained={<Button variant="contained">Смотреть</Button>}
      btnOutlined={<Button variant="outlined">В избранное</Button>}
    />
  );
};

export default MeditionPage;
