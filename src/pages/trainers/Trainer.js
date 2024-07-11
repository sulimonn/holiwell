import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { useGetTrainerQuery } from 'store/reducers/trainers';
import Avatar from 'components/Avatar';
import Image from 'components/Image';

const Trainer = () => {
  const { id } = useParams();
  const { data: trainer = {} } = useGetTrainerQuery(id);
  return (
    <Box width="100%">
      <Box
        width="100%"
        position="relative"
        height={{ xs: '425px', md: '500px' }}
        sx={{
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 0,
        }}
      >
        {trainer.path_to_background && (
          <Image
            src={process.env.REACT_APP_BASE_URL + trainer.path_to_background}
            alt="background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
            }}
          />
        )}
        <Typography variant="h1" color="common.white" sx={{ zIndex: 1 }}>
          {trainer.first_name} {trainer.last_name}
        </Typography>
      </Box>

      <Box maxWidth={{ xs: '100vw', md: '75vw' }} px={{ xs: 2, sm: 3, md: 4 }} pb={6} mx="auto">
        <Box
          display="flex"
          gap={{ xs: 0, md: 6 }}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            position="relative"
            top={{ xs: '-80px', sm: '-110px', md: '-135px' }}
            display="flex"
            justifyContent="center"
          >
            <Avatar avatar={trainer.path_to_avatar} border />
          </Box>

          <Box
            pt={{ xs: 0, md: 7 }}
            mt={{ xs: -5, md: 0 }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {trainer.description &&
              trainer.description.split('\n').map((item, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.primary"
                  lineHeight={1.5}
                  textAlign={{ xs: 'center', md: 'left' }}
                >
                  {item}
                </Typography>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Trainer;
