import React, { useRef } from 'react';

import { Box, Container, Typography } from '@mui/material';
import ListenItem from './ListenItem';
import Image from 'components/Image';
import { formatDuration } from 'utils/formatTime';

const audioCourse = {
  id: 0,
  title: 'название курса',
  description:
    'Откройте для себя преимущества регулярной медитации на нашем курсе, направленном на улучшение физического и эмоционального благополучия.',
  path_to_cover: 'listening.jpeg',
  lessons: [
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
      path_to_audio: 'https://mp3uk.net/mp3/files/rihanna-diamonds-mp3.mp3',
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
      path_to_audio: 'https://mp3uk.net/mp3/files/lana-del-rey-young-and-beautiful-mp3.mp3',
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
  ],
};

const ListenList = () => {
  const [playing, setPlaying] = React.useState(null);
  const audioRef = useRef(new Audio());
  const [totalDuration, setTotalDuration] = React.useState({ total: 0, items: [] });

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
    <Container>
      <Box height="500px" overflow="hidden">
        <Image
          src={require(`assets/images/girls/${audioCourse.path_to_cover}`)}
          alt="listen"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box my={5} width={{ xs: '100%', md: '580px' }} mx="auto">
        <Typography variant="body1" fontWeight="300" textAlign="center">
          Аудио-курс
        </Typography>
        <Typography
          variant="h1"
          fontWeight="500"
          textAlign="center"
          textTransform="uppercase"
          my={2}
        >
          {audioCourse.title}
        </Typography>
        <Typography variant="subtitle1" fontWeight="300" textAlign="center">
          {audioCourse.description}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="500"
          textAlign="center"
          textTransform="uppercase"
          my={2}
        >
          {formatDuration(totalDuration.total)}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        width={{ xs: '100%', md: '660px' }}
        py={4}
      >
        {audioCourse.lessons.map((lesson) => (
          <ListenItem
            key={lesson.id}
            lesson={lesson}
            handlePlayPause={handlePlayPause}
            playing={playing}
            setTotalDuration={setTotalDuration}
          />
        ))}
      </Box>
    </Container>
  );
};

export default ListenList;
