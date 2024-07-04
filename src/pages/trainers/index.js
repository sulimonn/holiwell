import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import TrainerCard from 'components/TrainerCard'; // eslint-disable-next-line
import { useGetTrainersQuery } from 'store/reducers/trainers';
import Back from 'components/Back';

const Trainers = () => {
  const { data: trainers = [] } = useGetTrainersQuery();
  // const trainers = [
  //   {
  //     id: 1,
  //     first_name: 'Имя',
  //     last_name: 'Фамилия',
  //     path_to_avatar: 'avatar-1.png',
  //     slogan: '',
  //   },
  //   {
  //     id: 2,
  //     first_name: 'Имя',
  //     last_name: 'Фамилия',
  //     path_to_avatar: 'avatar-2.png',
  //     slogan: '',
  //   },
  //   {
  //     id: 3,
  //     first_name: 'Имя',
  //     last_name: 'Фамилия',
  //     path_to_avatar: 'avatar-1.png',
  //     slogan: '',
  //   },
  //   {
  //     id: 4,
  //     first_name: 'Имя',
  //     last_name: 'Фамилия',
  //     path_to_avatar: 'avatar-2.png',
  //     slogan: '',
  //   },
  // ];

  return (
    <Box width="100%" py={8}>
      <Typography
        variant="h2"
        textTransform="uppercase"
        textAlign="center"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        Команда
      </Typography>
      <Back to="/" title="Команда" sx={{ display: { xs: 'block', md: 'none' } }} />
      <Container maxWidth="lg" sx={{ mt: { xs: 0, md: 6 } }}>
        <Grid
          container
          columnSpacing={{ xs: 0, sm: 4 }}
          rowSpacing={{ xs: 4, sm: 8 }}
          sx={{ my: 2 }}
        >
          {trainers.map((trainer) => (
            <Grid item xs={6} sm={4} md={3} key={trainer.id}>
              <TrainerCard trainer={trainer} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Trainers;
