import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { formatTime } from 'utils/formatTime';

const CourseCard = ({ course, index }) => {
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
    <Box width={{ xs: '320px', md: '580px' }}>
      <Link to={`/lessons/${course.id}`} style={{ textDecoration: 'none' }}>
        <Box
          height={{ xs: '170px', md: '326px' }}
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
            sx={{ filter: 'brightness(0.65)', zIndex: -1 }}
          >
            <img
              src={require('assets/images/girls/' + course.path_to_cover)}
              alt="course"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box p={1.5} backgroundColor="background.paper" width="min-content">
            <Typography variant="h5" fontWeight="100">
              {index}
            </Typography>
          </Box>
          <Box px={1} py={0.5} m={2.5} backgroundColor="background.paper" width="min-content">
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
        >
          {course.trainer.first_name} {course.trainer.last_name}
        </Typography>
      </Link>
    </Box>
  );
};

export default CourseCard;
