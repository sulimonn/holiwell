import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TrainerCard from './TrainerCard';
import Arrow2 from 'assets/images/icons/arrow2';

const TrainersList = ({ wrap = true }) => {
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
          <Box
            display="flex"
            justifyContent={{ xs: wrap ? 'center' : 'space-between', md: 'space-between' }}
            px={{ xs: 2, sm: 0 }}
          >
            <Typography
              variant="h3"
              fontWeight={{ xs: '400' }}
              textTransform="uppercase"
              sx={{ py: 0, fontSize: { xs: '1.5rem', md: '1.75rem' } }}
            >
              Команда
            </Typography>
            <Typography
              color="text.primary"
              fontWeight="300"
              component={Link}
              to="/trainers"
              variant="subtitle1"
              textTransform="uppercase"
              sx={{
                py: 0,
                display: { xs: wrap ? 'none' : 'block', md: 'block' },
                whiteSpace: 'nowrap',
              }}
            >
              Смотреть все <Arrow2 />
            </Typography>
          </Box>
          <Box
            sx={{
              overflowX: 'scroll',
            }}
          >
            <Box
              display="flex"
              flexWrap={{ xs: wrap ? 'wrap' : 'nowrap', md: 'nowrap' }}
              justifyContent={{ xs: wrap ? 'space-evenly' : 'flex-start', md: 'space-between' }}
              columnGap={{ xs: wrap ? 0.5 : 2, md: 4 }}
              rowGap={{ xs: 3, md: 4 }}
              overflow="visible"
              position="relative"
              px={{ xs: wrap ? 2 : 2, sm: 0 }}
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
