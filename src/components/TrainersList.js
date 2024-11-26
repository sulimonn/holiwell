import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TrainerCard from './TrainerCard';
import Arrow2 from 'assets/images/icons/arrow2';
import { useGetTrainersQuery } from 'store/reducers/trainers';

const TrainersList = ({ wrap = true }) => {
  const { data: trainers = [] } = useGetTrainersQuery();
  return (
    <Box display="flex" px={{ xs: 0, sm: 3, md: 4 }}>
      <Box
        maxWidth={{
          xs: '100vw',
          sm: 768,
          md: 1024,
          lg: 1200,
        }}
        width="100%"
        mx="auto"
      >
        <Box
          sx={{ py: 12, mb: { xs: 4, md: 10 } }}
          display="flex"
          flexDirection="column"
          gap={4}
          px={{ xs: 2, sm: 0 }}
        >
          <Box
            display="flex"
            justifyContent={{ xs: wrap ? 'center' : 'space-between', md: 'space-between' }}
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
                display: { xs: wrap ? 'none' : 'flex', md: 'flex' },
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                width: 'fit-content',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'primary.main',
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
                alignItems: 'baseline',
                gap: 0.5,
                height: 'fit-content',
              }}
            >
              Смотреть все <Arrow2 />
            </Typography>
          </Box>
          <Box
            sx={{
              overflowX: wrap ? 'none' : 'scroll',
            }}
          >
            <Box
              display="flex"
              flexWrap={{ xs: wrap ? 'wrap' : 'nowrap', md: 'nowrap' }}
              justifyContent={{ xs: wrap ? 'space-evenly' : 'flex-start', md: 'flex-start' }}
              columnGap={{ xs: wrap ? 2 : 4, sm: 8 }}
              rowGap={{ xs: 3, md: 4 }}
              overflow="visible"
              position="relative"
              pb={2}
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
