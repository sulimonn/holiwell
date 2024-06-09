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
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  return (
    <LessonPageBase
      cover={
        <VideoPlayer
          path_to_video={lesson.path_to_video}
          duration={duration}
          setDuration={setDuration}
          playing={playing}
          setPlaying={setPlaying}
        />
      }
      duration={duration}
      lesson={lesson}
      btnContained={
        <Button
          variant="contained"
          onClick={() => setPlaying(!playing)}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          {playing ? 'Пауза' : 'Смотреть'}
        </Button>
      }
      btnOutlined={<Button variant="outlined">В избранное</Button>}
    />
  );
};

export default MeditionPage;
