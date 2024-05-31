import React from 'react';
import { Box } from '@mui/material';
import LessonsBase from 'components/LessonsBase';
import MeditationCard from './MeditationCard';

const videos = [
  {
    id: 0,
    title: 'Медитация 1',
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
    title: 'Медитация 2',
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
    title: 'Медитация 3',
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
    title: 'Медитация 4',
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

const Meditation = () => {
  const [sortOption, setSortOption] = React.useState('new');
  return (
    <LessonsBase title="МЕДИТАЦИИ" sortOption={sortOption} setSortOption={setSortOption}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',

          rowGap: 5,
          columnGap: 1,
          justifyContent: 'space-between',
          py: 4,
        }}
      >
        {videos.map((video) => (
          <MeditationCard key={video.id} data={video} isSubscribed={true} />
        ))}
      </Box>
    </LessonsBase>
  );
};

export default Meditation;
