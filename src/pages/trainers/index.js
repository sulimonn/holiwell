import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import TrainerCard from 'components/TrainerCard'; // eslint-disable-next-line
import { useGetTrainersQuery } from 'store/reducers/trainers';

const Trainers = () => {
  //const { data: trainers = [] } = useGetTrainersQuery()
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
    <Box width="100%" py={8}>
      <Typography variant="h2" textTransform="uppercase" textAlign="center">
        Команда
      </Typography>
      <Container maxWidth="lg">
        <Grid container columnSpacing={4} rowSpacing={8} sx={{ my: 2 }}>
          {trainers.map((trainer) => (
            <Grid item xs={12} sm={6} md={3} key={trainer.id}>
              <TrainerCard trainer={trainer} />
            </Grid>
          ))}
          {[...trainers].reverse().map((trainer) => (
            <Grid item xs={12} sm={6} md={3} key={trainer.id}>
              <TrainerCard trainer={trainer} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Trainers;
