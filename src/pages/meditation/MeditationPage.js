import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import LessonPageBase from 'components/LessonPageBase';
import VideoPlayer from './VideoPlayer';
import { useSelector } from 'react-redux';

const MeditionPage = () => {
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const lesson = useSelector((state) => state.test.meditation).lessons.find(
    (lesson) => lesson.id === parseInt(id),
  );
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
