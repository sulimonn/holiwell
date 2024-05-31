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
      'https://mp3uk.net/mp3/files/nicholas-bonnin-angelicca-shut-up-and-listen-mp3.mp3',
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
  const [playing, setPlaying] = React.useState(null);
  const audioRef = useRef(new Audio());

  const handlePlayPause = (id, audioPath) => {
    if (playing === id) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      if (audioRef.current.src !== audioPath) {
        audioRef.current.src = audioPath;
      }
      audioRef.current
        .play()
        .then(() => setPlaying(id))
        .catch((error) => console.error('Error playing audio:', error));
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) audio.pause();
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
            playing={playing}
          />
        ))}
      </Box>
    </LessonsBase>
  );
};

export default ListenList;
