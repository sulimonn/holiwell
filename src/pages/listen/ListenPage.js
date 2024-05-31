import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import LessonPageBase from 'components/LessonPageBase';
import Controls from 'components/Controls';
import Image from 'components/Image';

const lesson = {
  id: 0,
  title: 'Урок 1 : Название аудио',
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
};

const ListenPage = () => {
  const [duration, setDuration] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [playedProgress, setPlayedProgress] = React.useState(0);

  const audioRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleProgress = useCallback(() => {
    setPlayedProgress(audioRef.current.currentTime / audioRef.current.duration);
  }, []);

  React.useEffect(() => {
    audioRef.current = new Audio(lesson.path_to_audio);
    const audio = audioRef.current;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', handleProgress);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleProgress);
    };
  }, [handleProgress]);

  return (
    <LessonPageBase
      cover={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: { xs: 260, sm: 550, md: 675 },
            position: 'relative',
          }}
          ref={containerRef}
        >
          <Box component="audio" ref={audioRef} sx={{ display: 'none' }} />
          <Image
            src={require(`assets/images/girls/${lesson.path_to_cover}`)}
            alt="cover"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
          <Controls
            duration={duration}
            playing={playing}
            setPlaying={setPlaying}
            mediaRef={audioRef}
            handlePlayPause={handlePlayPause}
            playedProgress={playedProgress}
            setPlayedProgress={setPlayedProgress}
            containerRef={containerRef}
          />
        </Box>
      }
      lesson={lesson}
      btnContained={
        <Button onClick={handlePlayPause} variant="contained">
          {playing ? 'Пауза' : 'Слушать'}
        </Button>
      }
      btnOutlined={<Button variant="outlined">В избранное</Button>}
      duration={duration}
    />
  );
};

export default ListenPage;
