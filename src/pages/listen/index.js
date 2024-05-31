import React, { useRef } from 'react';

import { Box } from '@mui/material';
import LessonsBase from 'components/LessonsBase';
import ListenItem from './ListenItem';

const audios = [
  {
    id: 0,
    title: 'Урок 1 : Название аудио',
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
    id: 2,
    title: 'Урок 2 : Название аудио',
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
    id: 3,
    title: 'Урок 3 : Название аудио',
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
    title: 'Урок 4 : Название аудио',
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

const ListenList = () => {
  const [sortOption, setSortOption] = React.useState('new');
  const [duration, setDuration] = React.useState(0);
  const [playing, setPlaying] = React.useState(null);
  const audioRef = useRef(null);

  const handlePlayPause = (id, audioPath) => {
    if (playing === id) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioPath);
      audioRef.current.play();
      setPlaying(id);
    }
  };
  React.useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  return (
    <LessonsBase title="Слушай" sortOption={sortOption} setSortOption={setSortOption}>
      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        width={{ xs: '100%', md: '660px' }}
        py={4}
      >
        {audios.map((lesson) => (
          <ListenItem
            key={lesson.id}
            lesson={lesson}
            handlePlayPause={handlePlayPause}
            audioRef={audioRef}
            playing={playing}
            setPlaying={setPlaying}
            duration={duration}
          />
        ))}
      </Box>
    </LessonsBase>
  );
};

export default ListenList;
