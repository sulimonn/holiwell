import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import LessonPageBase from 'components/LessonPageBase';
import VideoPlayer from './VideoPlayer';
import { useGetLessonQuery } from 'store/reducers/courses';
import { timeToSeconds } from 'utils/formatTime';

const MeditionPage = () => {
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const { data: lesson = {}, isFetching } = useGetLessonQuery(id);

  if (isFetching) return null;
  return (
    <LessonPageBase
      cover={
        <VideoPlayer
          path_to_video={lesson.path_to_video}
          duration={timeToSeconds(lesson.video_length)}
          playing={playing}
          setPlaying={setPlaying}
        />
      }
      duration={timeToSeconds(lesson.video_length)}
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
