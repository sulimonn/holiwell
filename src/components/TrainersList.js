import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
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
    <Box display="flex" px={{ xs: 0, sm: 3, md: 4 }}>
      <Box
        maxWidth={{
          xs: '100vw',
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        }}
        mx="auto"
      >
        <Box sx={{ py: 12, mb: { xs: 6, md: 12 } }} display="flex" flexDirection="column" gap={4}>
          <Box display="flex" justifyContent="space-between" px={{ xs: 2, sm: 0 }}>
            <Typography variant="h3" textTransform="uppercase" sx={{ py: 0 }}>
              Команда
            </Typography>
            <Typography
              color="text.primary"
              fontWeight="300"
              component={Link}
              to="/trainers"
              variant="subtitle1"
              textTransform="uppercase"
              sx={{ py: 0 }}
            >
              Смотреть все
            </Typography>
          </Box>
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
        </Box>
      </Box>
    </Box>
  );
};

export default TrainersList;
