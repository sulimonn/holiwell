import React from 'react';
import { Box } from '@mui/material';
import TrainerCard from './TrainerCard'; // eslint-disable-next-line
import { useGetTrainersQuery } from 'store/reducers/trainers';

const TrainersList = () => {
  // const {
  //   data: trainers = [
  //     {
  //       id: 1,
  //       first_name: 'Имя',
  //       last_name: 'Фамилия',
  //       path_to_avatar: 'avatar-1.png',
  //       slogan: '',
  //     },
  //     {
  //       id: 2,
  //       first_name: 'Имя',
  //       last_name: 'Фамилия',
  //       path_to_avatar: 'avatar-2.png',
  //       slogan: '',
  //     },
  //     {
  //       id: 3,
  //       first_name: 'Имя',
  //       last_name: 'Фамилия',
  //       path_to_avatar: 'avatar-1.png',
  //       slogan: '',
  //     },
  //     {
  //       id: 4,
  //       first_name: 'Имя',
  //       last_name: 'Фамилия',
  //       path_to_avatar: 'avatar-2.png',
  //       slogan: '',
  //     },
  //   ],
  // } = useGetTrainersQuery();
  const trainers = [
    {
      id: 1,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 2,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-2.png',
      slogan: '',
    },
    {
      id: 3,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      slogan: '',
    },
    {
      id: 4,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-2.png',
      slogan: '',
    },
  ];
  return (
    <Box
      sx={{
        overflowX: 'scroll',
      }}
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        justifyContent="space-between"
        gap={4}
        overflow="visible"
        position="relative"
      >
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </Box>
    </Box>
  );
};

export default TrainersList;
