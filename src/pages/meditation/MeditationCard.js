import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { convertTime } from 'utils/formatTime';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';

import { Box, Typography } from '@mui/material';
import Image from 'components/Image';

const MeditationCard = ({ lesson, isSubscribed, index }) => {
  const navigate = useNavigate();
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [musicDuration, setMusicDuration] = useState('00:00');

  useEffect(() => {
    if (lesson) {
      setMusicDuration(convertTime(lesson.video_length));
    }
  }, [lesson]);

  return (
    <Box width={{ xs: '100%', md: 'auto' }} position={{ xs: 'relative', md: 'static' }}>
      <Link
        to={isSubscribed ? `${lesson.id}` : '#'}
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
              px={{ xs: 0.7, md: 2 }}
              py={{ xs: 0.3, md: 1 }}
              backgroundColor="background.default"
              width="min-content"
              sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            >
              <Typography variant="h5" fontWeight="100">
                {index}
              </Typography>
            </Box>
            <Box
              position={{ xs: 'static', md: 'absolute' }}
              top="-85%"
              bottom="0"
              overflow="visible"
              width="100%"
              sx={{ filter: isSubscribed ? 'brightness(1)' : 'brightness(0.65)', zIndex: -1 }}
            >
              <Image
                src={process.env.REACT_APP_BASE_URL + lesson.path_to_cover}
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
              textAlign="center"
              color="primary.main"
              sx={{ fontSize: { xs: '1.15rem !important', md: 'inherit' } }}
            >
              {lesson.title}
            </Typography>
            <Typography
              onClick={() => navigate(`/trainers/${lesson.trainer?.id}`)}
              variant="subtitle1"
              fontWeight="100"
              color="primary.main"
              textAlign="center"
              sx={{
                position: 'relative',
                width: 'fit-content',
                mx: 'auto',
              }}
            >
              {lesson.trainer?.first_name} {lesson.trainer?.last_name}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default MeditationCard;
