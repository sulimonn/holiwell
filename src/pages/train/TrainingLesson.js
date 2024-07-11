import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Box, Container, Typography, Divider, Button, IconButton } from '@mui/material';
import { convertTime, timeToSeconds } from 'utils/formatTime'; // eslint-disable-next-line
import Icon from '@ant-design/icons';
import CalendarIcon from 'assets/images/icons/Calendar';
import ModalCalendar from 'pages/calendar/ModalCalendar';
import Heart from 'assets/images/icons/heart';
import Arrow2 from 'assets/images/icons/arrow2';
import {
  useLikeLessonMutation,
  useUnlikeLessonMutation,
  useWatchLessonMutation,
} from 'store/reducers/userApi';
import { useGetLessonQuery } from 'store/reducers/courses';
import Avatar from 'components/Avatar';
import VideoPlayer from 'pages/meditation/VideoPlayer';
import PrevNextLessonCard from './PrevNextLessonCard';

const TraningPage = () => {
  const { lessonId: id } = useParams();
  const { data: lesson = {}, isSuccess } = useGetLessonQuery(id);
  const [open, setOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [watchLesson, { isLoading }] = useWatchLessonMutation();
  const [likeLesson, { isLoading: isLoadingLike }] = useLikeLessonMutation();
  const [unlikeLesson] = useUnlikeLessonMutation();

  const Calendar = (props) => <Icon component={CalendarIcon} {...props} />;
  const HeartIcon = (props) => <Icon component={Heart} {...props} />;
  const ArrowTo = (props) => <Icon component={Arrow2} {...props} />;

  const [isFavourite, setFavourite] = React.useState(lesson?.is_favorite);

  React.useEffect(() => {
    const watchThisLesson = async () => {
      const formData = new FormData();
      formData.append('lesson_id', lesson.id);
      await watchLesson(formData);
    };
    if (!lesson.is_viewed && isSuccess) watchThisLesson();
    if (isSuccess) setFavourite(lesson?.is_favorite);
  }, [lesson, watchLesson, isSuccess]);

  if (!isSuccess) return null;
  return (
    <>
      <ModalCalendar lesson_id={lesson.id} open={open} setOpen={setOpen} />
      <Box width="100%">
        <Container maxWidth="lg" sx={{ px: { xs: 0, md: 2 } }}>
          <VideoPlayer
            path_to_video={lesson.path_to_video}
            duration={timeToSeconds(lesson.video_length)}
            playing={playing}
            setPlaying={setPlaying}
          />
        </Container>
        <Container maxWidth="lg">
          <Box pt={{ xs: 0, md: 5 }} pb={{ xs: 4, md: 7 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h1" textTransform="uppercase">
                {lesson.title}
              </Typography>
              <Box display="flex" alignItems="center" my={3} gap={6}>
                <Typography variant="body2" fontWeight="300" sx={{ textAlign: 'center' }}>
                  {lesson.trainer.first_name} {lesson.trainer.last_name}
                </Typography>
                <Typography variant="body2">{convertTime(lesson.video_length)}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2} width={{ xs: '100%', sm: 'auto' }}>
                <Button
                  variant="contained"
                  onClick={() => setPlaying(!playing)}
                  sx={{ width: { xs: '100%', md: 'auto' } }}
                >
                  {playing ? 'Пауза' : 'Смотреть'}
                </Button>
                {isFavourite ? (
                  <IconButton
                    size="large"
                    onClick={async () => {
                      const formData = new FormData();
                      formData.append('lesson_id', lesson.id);
                      const response = await unlikeLesson(formData);
                      if (!response?.error) setFavourite(false);
                    }}
                    disabled={isLoading || isLoadingLike}
                    sx={{
                      '& svg': { width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } },
                      height: '100%',
                      p: 0,
                    }}
                  >
                    <HeartIcon />
                  </IconButton>
                ) : (
                  <Button
                    variant="outlined"
                    disabled={isLoading || isLoadingLike}
                    onClick={async () => {
                      const formData = new FormData();
                      formData.append('lesson_id', lesson.id);
                      const response = await likeLesson(formData);
                      if (!response?.error) setFavourite(true);
                    }}
                    sx={{ width: { xs: '100%', md: 'auto' }, whiteSpace: 'nowrap' }}
                  >
                    В избранное
                  </Button>
                )}
              </Box>
              <Button
                size="small"
                endIcon={<Calendar style={{ opacity: 0.5 }} />}
                sx={{ p: 1, mt: 3 }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Typography sx={{ opacity: 0.5 }} variant="subtitle1">
                  Запланировать
                </Typography>
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box
            py={{ xs: 4, md: 7 }}
            textAlign={{ xs: 'left', md: 'center' }}
            width={{ xs: '100%', md: '50%' }}
            mx="auto"
          >
            <Typography
              variant="h3"
              textTransform={{ xs: 'none', md: 'uppercase' }}
              sx={{ fontSize: { xs: '1.25rem', md: 'inherit' } }}
            >
              Описание урока
            </Typography>
            <Typography
              variant="body2"
              fontWeight="300"
              my={{ xs: 2, md: 3 }}
              lineHeight={1.4}
              sx={{ whiteSpace: 'pre-line' }}
            >
              {lesson.description}
            </Typography>
            <Typography color="primary.light" component={Link} to="/" variant="body2">
              Читать дальше
            </Typography>
          </Box>
          <Divider />
          {lesson.links_before ||
            (lesson.links_after && (
              <>
                <Box
                  py={{ xs: 4, md: 7 }}
                  display="grid"
                  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                >
                  <PrevNextLessonCard linked_lesson={lesson.links_before} title="До тренировки" />
                  <PrevNextLessonCard linked_lesson={lesson.links_after} title="После тренировки" />
                </Box>
                <Divider />
              </>
            ))}
          <Box
            py={{ xs: 4, md: 7 }}
            textAlign="center"
            width={{ xs: '100%', md: '60%' }}
            mx="auto"
            display="flex"
            gap={{ xs: 0.5, md: 3 }}
            flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
          >
            <Avatar avatar={lesson.trainer.path_to_avatar} />
            <Box
              textAlign="left"
              display="flex"
              flexDirection="column"
              gap={{ xs: 1.2, md: 2 }}
              justifyContent={{ xs: 'flex-start', md: 'center' }}
            >
              <Typography variant="body2" sx={{ fontSize: { xs: '1.25rem', md: 'inherit' } }}>
                Тренер урока
              </Typography>
              <Typography
                fontWeight="300"
                variant="h3"
                sx={{ fontSize: { xs: '0.85rem', md: 'inherit' } }}
              >
                {lesson.trainer.first_name} {lesson.trainer.last_name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'pre-line', display: { xs: 'none', sm: 'block' } }}
              >
                {lesson.trainer.description}
              </Typography>

              <Typography
                component={Link}
                to={`/trainers/${lesson.trainer.id}`}
                variant="body2"
                textTransform="uppercase"
                color="primary.main"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  textDecoration: 'none',
                  width: 'fit-content',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'primary.main',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  },
                  alignItems: 'baseline',
                  gap: 0.5,
                }}
              >
                Подробнее <ArrowTo fontSize="5.5rem" />
              </Typography>
            </Box>
            <br />
            <Box display={{ xs: 'flex', sm: 'none' }} flex={1} width="100%" flexDirection="column">
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', my: 2 }} textAlign="left">
                {lesson.trainer.description}
              </Typography>

              <Typography
                component={Link}
                to={`/trainers/${lesson.trainer.id}`}
                variant="body2"
                textTransform="uppercase"
                color="primary.main"
                sx={{
                  textDecoration: 'none',
                  position: 'relative',
                  textAlign: 'left',
                  width: 'fit-content',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'primary.main',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  },
                }}
              >
                Подробнее <ArrowTo fontSize="inherit" />
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TraningPage;
