import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Typography, Button, Stack } from '@mui/material';
import { convertTime } from 'utils/formatTime';
import Image from 'components/Image';
import LockedIcon from 'assets/images/icons/lock';
import PlayIcon from '@mui/icons-material/PlayArrowRounded';

const BaseAudioContextLessonCard = ({ course, index, setIsSubscribed, isSubscribed }) => {
  const props = isSubscribed
    ? {
        component: Link,
        to: `/${course.course_type_slug}/${course.course_id}/${course.id}`,
        sx: { textDecoration: 'none', color: 'inherit', height: '100%' },
      }
    : { sx: { height: '100%' } };

  const navigate = useNavigate();

  if (!course) return null;

  return (
    <Box {...props}>
      <Stack justifyContent="space-between" height="100%">
        <Box width="100%">
          <Box
            maxWidth={{ xs: '100%', md: '100%' }}
            height={{ xs: '127px', md: '220px' }}
            overflow="hidden"
            mb={1.5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Image
              src={process.env.REACT_APP_BASE_URL + course.path_to_cover}
              alt={course.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', flex: 1 }}
            />

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
              }}
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
              >
                {!isSubscribed ? (
                  <Box
                    sx={{ width: { xs: '50px', sm: '100px' }, height: { xs: '50px', sm: '100px' } }}
                  >
                    <LockedIcon />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      p: { xs: 1.5, sm: 2.5 },
                      border: '1px solid white',
                      borderRadius: '50%',
                    }}
                  >
                    <PlayIcon
                      sx={{
                        color: 'white',
                        width: { xs: '30px', sm: '40px' },
                        height: { xs: '30px', sm: '40px' },
                      }}
                      fontSize="large"
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                m: { xs: 1, sm: 2 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
              }}
            >
              <Box sx={{ px: 1, py: 0.5 }}>
                <Typography variant="body2" fontWeight="100">
                  {convertTime(course?.video_length)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography variant="h4"> {course.title}</Typography>
          <Typography variant="body2" fontWeight="100" mt={0.5}>
            {course?.trainer?.first_name} {course?.trainer?.last_name}
          </Typography>
        </Box>
        {!isSubscribed && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              mt: 0.5,
            }}
            onClick={() => navigate(`/subscription/${course.course_type_slug}`)}
          >
            <Typography
              variant="h4"
              fontSize={{ xs: '12px', sm: '16px' }}
              sx={{ whiteSpace: 'nowrap' }}
            >
              АКТИВИРОВАТЬ ПОДПИСКУ
            </Typography>
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default BaseAudioContextLessonCard;
