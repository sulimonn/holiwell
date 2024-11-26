import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import Image from 'components/Image';
import LockedIcon from 'assets/images/icons/lock';
import PlayIcon from '@mui/icons-material/PlayArrowRounded';

const CourseCard = ({ course = {}, isSubscribed }) => {
  const props =
    course.lessons.length > 0
      ? {
          component: Link,
          to: `/${course.course_type_slug}/${course.id}`,
          sx: { textDecoration: 'none', color: 'inherit' },
        }
      : {};

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      {...props}
    >
      <Box
        width={'100%'}
        height={{ xs: '127px', md: '220px' }}
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        mb={1.5}
      >
        <Image
          src={process.env.REACT_APP_BASE_URL + course.path_to_cover}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              <Box sx={{ width: { xs: '50px', sm: '100px' }, height: { xs: '50px', sm: '100px' } }}>
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
            backgroundColor: 'primary.main',
          }}
        >
          <Box sx={{ px: 1, py: 0.5 }}>
            <Typography variant="body2" fontWeight="100" color="white">
              {course.lessons?.length === 0
                ? 'Нет уроков'
                : course.lessons?.length +
                  ' ' +
                  (course.lessons?.length === 1
                    ? 'урок'
                    : course.lessons?.length > 4
                      ? 'уроков'
                      : 'урока')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="h4"> {course.title}</Typography>
      <Typography variant="body2" fontWeight="100" mt={0.5}>
        {course.lessons[0]?.trainer.first_name} {course.lessons[0]?.trainer.last_name}
      </Typography>
    </Box>
  );
};

export default CourseCard;
