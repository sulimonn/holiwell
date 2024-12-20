import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { convertTime } from 'utils/formatTime';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';
import Image from 'components/Image';

const LessonCard = ({ course, index, size = 'large', isSubscribed = true }) => {
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const objectUrl = course.path_to_audio;

  const audio = document.createElement('audio');
  audio.src = objectUrl;

  React.useEffect(() => {
    return () => {
      if (objectUrl instanceof File) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);
  if (!course) return null;

  return (
    <Box
      flex={1}
      minWidth={{ xs: '100%', sm: '48%' }}
      maxWidth={{ xs: '100%', sm: '48%' }}
      height="100%"
    >
      <Link
        to={isSubscribed ? `/${course.course_type_slug}/${course.course_id}/${course.id}` : null}
        style={{ textDecoration: 'none', pointerEvents: isSubscribed ? 'all' : 'none' }}
      >
        <Box
          height={{ xs: '210px', md: size === 'large' ? '326px' : '340px' }}
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
            <Image
              src={process.env.REACT_APP_BASE_URL + course.path_to_cover}
              alt="course"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Box>
          <Box px={2} py={1} backgroundColor="background.default" width="min-content">
            <Typography variant="h5" fontWeight="100">
              {index}
            </Typography>
          </Box>

          {!isSubscribed && course?.video_length && (
            <Box sx={{ width: { xs: 60, md: 70 }, height: { xs: 60, md: 70 }, mx: 'auto' }}>
              <LockedIcon fontSize="large" style={{ width: '100%', height: '100%' }} />
            </Box>
          )}
          <Box px={1} py={0.5} m={2.5} backgroundColor="background.default" width="min-content">
            <Typography variant="h5" fontWeight="100">
              {convertTime(course.video_length || '00:00:00')}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" fontWeight="400" textAlign="center" mt={1} color="primary.main">
          {course.title}
        </Typography>
      </Link>
      <Link to={`/trainers/${course.trainer?.id}`} style={{ textDecoration: 'none' }}>
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
          {course?.trainer?.first_name} {course.trainer?.last_name}
        </Typography>
      </Link>
    </Box>
  );
};

export default LessonCard;
