import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime } from 'utils/formatTime';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';

import { Box, Typography } from '@mui/material';
import Image from 'components/Image';

const MeditationCard = ({ data, isSubscribed }) => {
  const navigate = useNavigate();
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [musicDuration, setMusicDuration] = useState('00:00');

  useEffect(() => {
    const audio = document.createElement('audio');
    audio.src = data.path_to_audio;

    const updateDuration = () => {
      const formattedDuration = formatTime(audio.duration);
      setMusicDuration(formattedDuration);
    };

    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [data.path_to_audio]);

  return (
    <Box width={{ xs: '100%', md: 'auto' }} position={{ xs: 'relative', md: 'static' }}>
      <Link
        to={isSubscribed ? `/meditation/${data.id}` : '#'}
        style={{ textDecoration: 'none', pointerEvents: isSubscribed ? 'all' : 'none' }}
      >
        <Box
          display="flex"
          width={{ xs: '100%', md: '373px' }}
          sx={{
            position: { xs: 'relative', md: 'static' },
            flexDirection: { xs: 'row', md: 'column' },
            gap: { xs: 2, md: 1.5 },
          }}
        >
          <Box
            height={{ xs: '100px', md: '220px' }}
            width={{ xs: '100px', md: '100%' }}
            sx={{
              overflow: 'hidden',
              position: { xs: 'static', md: 'relative' },
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: { xs: 'row', md: 'column' },
              color: 'primary.main',
            }}
          >
            <Box
              position={{ xs: 'static', md: 'absolute' }}
              top="-85%"
              bottom="0"
              overflow="visible"
              width="100%"
              sx={{ filter: isSubscribed ? 'brightness(1)' : 'brightness(0.65)', zIndex: -1 }}
            >
              <Image
                src={require('assets/images/girls/' + data.path_to_cover)}
                alt="data"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </Box>

            {!isSubscribed && <LockedIcon fontSize="large" />}
            <Box
              px={{ xs: 0, md: 1 }}
              py={{ xs: 0, md: 0.5 }}
              m={{ xs: 0, md: 2 }}
              backgroundColor="background.default"
              width="min-content"
              sx={{ position: { xs: 'absolute', md: 'static' }, right: 0, top: 0 }}
            >
              <Typography variant="h5" fontWeight="100">
                {musicDuration}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={1} justifyContent="center">
            <Typography
              variant="h5"
              fontWeight="400"
              textAlign="left"
              color="primary.main"
              sx={{ fontSize: { xs: '1.15rem !important', md: 'inherit' } }}
            >
              {data.title}
            </Typography>
            <Typography
              onClick={() => navigate(`/trainers/${data.trainer.id}`)}
              variant="body2"
              fontWeight="100"
              color="primary.main"
              sx={{
                position: 'relative',
                width: 'fit-content',
                '&::after': {
                  content: '""',
                  borderBottom: '1px solid',
                  borderColor: 'primary.light',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: '100%',
                  transition: 'all 0.3s ease',
                },
                '&:hover::after, &:focus::after, &:active::after': { right: 0 },
              }}
            >
              {data.trainer.first_name} {data.trainer.last_name}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default MeditationCard;
