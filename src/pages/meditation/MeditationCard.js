import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from 'utils/formatTime';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';

import { Box, Typography } from '@mui/material';

const MeditationCard = ({ data, isSubscribed }) => {
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [musicDuration, setMusicDuration] = React.useState('00:00');
  const objectUrl = data.path_to_audio;

  const audio = document.createElement('audio');
  audio.src = objectUrl;

  audio.addEventListener('loadedmetadata', () => {
    const formattedDuration = formatTime(audio.duration);
    setMusicDuration(formattedDuration);
  });

  React.useEffect(() => {
    return () => {
      if (objectUrl instanceof File) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);
  return (
    <Box width={{ xs: '100%', sm: '373px' }}>
      <Link
        to={`/meditation/${isSubscribed ? data.id : null}`}
        style={{ textDecoration: 'none', pointerEvents: isSubscribed ? 'all' : 'none' }}
      >
        <Box
          height={{ xs: '170px', md: '220px' }}
          sx={{
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            color: 'primary.main',
          }}
        >
          <div></div>
          <Box
            position="absolute"
            top="-85%"
            bottom="0"
            overflow="visible"
            width="100%"
            sx={{ filter: isSubscribed ? 'brightness(1)' : 'brightness(0.65)', zIndex: -1 }}
          >
            <img
              src={require('assets/images/girls/' + data.path_to_cover)}
              alt="data"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          {!isSubscribed && <LockedIcon fontSize="large" />}
          <Box px={1} py={0.5} m={2} backgroundColor="background.default" width="min-content">
            <Typography variant="h5" fontWeight="100">
              {musicDuration}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" fontWeight="400" textAlign="left" mt={1.5} color="primary.main">
          {data.title}
        </Typography>
      </Link>
      <Link
        to={`/trainers/${data.trainer.id}`}
        style={{ textDecoration: 'none', textAlign: 'left' }}
      >
        <Typography
          variant="body2"
          fontWeight="100"
          mt={1}
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
      </Link>
    </Box>
  );
};

export default MeditationCard;
