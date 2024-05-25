import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { useGetTrainerQuery } from 'store/reducers/trainers';
import Avatar from 'components/Avatar';

const Trainer = () => {
  const { id } = useParams();
  const {
    data: trainer = {
      id: 1,
      first_name: 'Имя',
      last_name: 'Фамилия',
      path_to_avatar: 'avatar-1.png',
      path_to_background: 'background-1.jpeg',
      description:
        'Равным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Разнообразный и богатый опыт сложившаяся структура организации представляет собой интересный эксперимент проверки форм развития.\nРавным образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Разнообразный и богатый опыт сложившаяся структура организации представляет собой интересный эксперимент проверки форм развития.',
    },
  } = useGetTrainerQuery(id);
  return (
    <Box width="100%">
      <Box
        width="100%"
        position="relative"
        height="50vh"
        sx={{
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 0,
        }}
      >
        <img
          src={require('assets/images/girls/' + trainer.path_to_background + '')}
          alt="background"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            position: 'absolute',
            top: '-20%',
          }}
        />
        <Typography variant="h1" color="common.white" sx={{ zIndex: 1 }}>
          {trainer.first_name} {trainer.last_name}
        </Typography>
      </Box>

      <Box maxWidth={{ xs: '100vw', md: '75vw' }} px={{ xs: 2, sm: 3, md: 4 }} pb={6} mx="auto">
        <Box display="flex" gap={6}>
          <Box position="relative" top={{ xs: '-90px', sm: '-110px', md: '-135px' }}>
            <Avatar avatar={trainer.path_to_avatar} />
          </Box>

          <Box pt={7} display="flex" flexDirection="column" gap={2}>
            {trainer.description.split('\n').map((item, index) => (
              <Typography key={index} variant="body2" color="text.primary" lineHeight={1.5}>
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
