import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { formatTime } from 'utils/formatTime';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';

const CourseCard = ({ course, index, size = 'large', isSubscribed = true }) => {
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [musicDuration, setMusicDuration] = React.useState('00:00');
  const objectUrl = course.path_to_audio;

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
    <Box flex={1} minWidth={{ xs: '100%', sm: '45%' }}>
      <Link
        to={`/lessons/${isSubscribed ? course.id : null}`}
        style={{ textDecoration: 'none', pointerEvents: isSubscribed ? 'all' : 'none' }}
      >
        <Box
          height={{ xs: '170px', md: size === 'large' ? '326px' : '220px' }}
          sx={{
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            color: 'primary.main',
          }}
        >
          <Box
            position="absolute"
            top="-85%"
            bottom="0"
            overflow="visible"
            width="100%"
            sx={{ filter: isSubscribed ? 'brightness(1)' : 'brightness(0.65)', zIndex: -1 }}
          >
            <img
              src={require('assets/images/girls/' + course.path_to_cover)}
              alt="course"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box px={2} py={1} backgroundColor="background.default" width="min-content">
            <Typography variant="h5" fontWeight="100">
              {index}
            </Typography>
          </Box>

          {!isSubscribed && <LockedIcon fontSize="large" />}
          <Box px={1} py={0.5} m={2.5} backgroundColor="background.default" width="min-content">
            <Typography variant="h5" fontWeight="100">
              {musicDuration}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" fontWeight="400" textAlign="center" mt={1} color="primary.main">
          {course.title}
        </Typography>
      </Link>
      <Link to={`/trainers/${course.trainer.id}`} style={{ textDecoration: 'none' }}>
        <Typography
          variant="body2"
          fontWeight="300"
          textAlign="center"
          mt={0.5}
          color="primary.light"
          sx={{
            position: 'relative',
            mx: 'auto',
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
          {course.trainer.first_name} {course.trainer.last_name}
        </Typography>
      </Link>
    </Box>
  );
};

export default CourseCard;
