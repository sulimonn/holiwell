import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Container, Button } from '@mui/material';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';
import PlayPauseButton from 'components/PlayPauseButton';
import LessonCard from './LessonCard';
import TrainersList from 'components/TrainersList';
import { subscribe } from 'store/reducers/subscription';
import Image from 'components/Image';
import { useGetCourseQuery } from 'store/reducers/courses';

const Lesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isSubscribed } = useSelector((state) => state.subscription);
  const audioRef = React.useRef(null);

  const dispatch = useDispatch();
  const LockedIcon = (props) => <Icon component={lock} {...props} />;
  const [isPlaying, setPlaying] = React.useState(false);

  const { data: course = {}, isFetching, isSuccess } = useGetCourseQuery(courseId);

  const handleSubscription = () => {
    if (!isSubscribed) {
      navigate(`/subscription/${course.course_type_slug}`);
    } else dispatch(subscribe());
  };

  React.useEffect(() => {
    if (audioRef) {
      audioRef.current = new Audio(course?.path_to_url_audio);

      audioRef.current.onended = () => {
        setPlaying(false);
      };

      if (isPlaying) {
        audioRef.current.play();
      }

      return () => {
        audioRef.current.pause();
      };
    }
  }, [course, isPlaying]);
  if (isFetching || !isSuccess) return null;

  return (
    <Box width="100%">
      <Box
        width="100%"
        position="relative"
        height={{ xs: '360px', sm: '450px', md: '500px' }}
        overflow="hidden"
        sx={{
          '& img': {
            objectPosition: { xs: 'center', md: 'top center' },
            mb: { xs: 3, md: 4 },
          },
        }}
      >
        <Image
          src={process.env.REACT_APP_BASE_URL + course.path_to_cover}
          alt="girl"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            filter: isSubscribed ? 'none' : 'brightness(0.6)',
            zIndex: 1,
          }}
        />
        {!isSubscribed && (
          <Box
            position="relative"
            zIndex={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1.5}
            height="100%"
          >
            <Box>
              <LockedIcon fontSize="large" style={{ width: '100px', height: '100px' }} />
            </Box>
            <Typography
              color="primary.contrastText"
              variant="h4"
              fontWeight="400"
              textTransform="uppercase"
            >
              Разблокируйте курс
            </Typography>
          </Box>
        )}
      </Box>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          gap={{ xs: 2, md: 4 }}
          textAlign="center"
          alignItems="center"
          py={{ xs: 3, md: 6 }}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography
            variant="h1"
            textTransform="uppercase"
            fontWeight={{ xs: 400, md: '500' }}
            fontSize={{ xs: 25, md: '2.5rem' }}
          >
            {course.title}
          </Typography>
          <Typography variant="body1" fontWeight={{ xs: 100, sm: '300' }}>
            Курс тренировок
          </Typography>
          {isSubscribed ? (
            <Typography variant="h4" fontWeight="400">
              Дисциплина - ключ к успеху
            </Typography>
          ) : (
            <Button variant="contained" onClick={handleSubscription}>
              АКТИВИРОВАТЬ ДОСТУП {course.price_cource} ₽
            </Button>
          )}
        </Box>
        <Box
          display="flex"
          py={10}
          gap={3}
          borderBottom="1px solid"
          borderColor="divider"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Box flex={1}>
            <Typography variant="h3" textTransform="uppercase">
              О курсе
            </Typography>
            <Typography variant="h5" component="p" sx={{ mt: 1.5, whiteSpace: 'pre-line' }}>
              {course.description}
            </Typography>
          </Box>
          {course?.path_to_url_audio && (
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
              <Button
                onClick={() => setPlaying(!isPlaying)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: 'divider',
                  px: 1,
                  py: 1,
                }}
                fullWidth
              >
                <PlayPauseButton isPlaying={isPlaying} sx={{ width: '50px', height: '50px' }} />
                <Typography variant="body1" textTransform="none" sx={{ ml: 1 }}>
                  Аудио запись
                </Typography>
              </Button>
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          py={10}
          justifyContent="space-between"
          rowGap={2}
          columnGap={2}
          borderBottom="1px solid"
          borderColor="divider"
        >
          {course.lessons?.length &&
            course.lessons.map((lesson, index) => (
              <LessonCard
                key={course.id}
                course={lesson}
                index={index + 1}
                isSubscribed={isSubscribed}
                size="small"
              />
            ))}
        </Box>
      </Container>

      <TrainersList />
    </Box>
  );
};

export default Lesson;
