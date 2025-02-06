import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Container, Typography, Divider, Stack, Button } from '@mui/material';
import ListenItem from 'components/ListenItem';
import Image from 'components/Image';
import { addSeconds, formatDuration, timeToSeconds } from 'utils/formatTime';
import Back from 'components/Back';
import { useGetCourseQuery } from 'store/reducers/courses';
import PlayPauseButton from 'components/PlayPauseButton';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';
import Loader from 'components/Loader';

const ListenList = () => {
  const { courseId } = useParams();
  const { data: audioCourse = {}, isFetching } = useGetCourseQuery(courseId);
  const audioRef = useRef(new Audio());
  const coverRef = useRef(new Audio());
  const [isCoverPlaying, setIsCoverPlaying] = React.useState(false);
  const [playing, setPlaying] = React.useState(null);
  const [totalDuration, setTotalDuration] = React.useState(0);

  const LockedIcon = (props) => <Icon component={lock} {...props} />;

  const handlePlayPause = (id, audioPath) => {
    if (playing === id) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      if (audioRef.current.src !== audioPath) {
        audioRef.current.src = audioPath;
      }
      audioRef.current
        .play()
        .then(() => setPlaying(id))
        .catch((error) => console.error('Error playing audio:', error));
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audioCourse?.lessons?.length > 0) {
      setTotalDuration((prev) =>
        addSeconds(audioCourse.lessons.map((lesson) => timeToSeconds(lesson.audio_length))),
      );
    }

    if (audio) {
      audio.onended = () => {
        setPlaying(null);
      };
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [audioCourse]);

  React.useEffect(() => {
    if (coverRef.current) {
      coverRef.current = new Audio(audioCourse?.path_to_url_audio);

      coverRef.current.onended = () => {
        setPlaying(false);
      };

      if (isCoverPlaying) {
        coverRef.current.play();
      }

      return () => {
        coverRef.current.pause();
      };
    }
  }, [audioCourse, isCoverPlaying]);

  if (isFetching) return <Loader />;

  return (
    <Container maxWidth="lg">
      <Back to="/" sx={{ mt: 2, display: { xs: 'inherit', sm: 'none' } }} />
      <Box
        height={{ xs: '220px', sm: '500px' }}
        width={{ xs: '220px', sm: '100%' }}
        overflow="hidden"
        mx="auto"
        mt={{ xs: 7, sm: 0 }}
        position="relative"
      >
        <Image
          src={process.env.REACT_APP_BASE_URL + audioCourse.path_to_cover}
          alt="listen"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            filter: 'brightness(0.6)',
            zIndex: 1,
          }}
        />
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
      </Box>
      <Box
        my={5}
        width={{
          xs: '100%',
          md: '580px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        mx="auto"
      >
        <Typography variant="body1" fontWeight="300" textAlign="center">
          Аудио-курс
        </Typography>
        <Typography
          variant="h1"
          fontWeight="500"
          textAlign="center"
          textTransform="uppercase"
          my={2}
        >
          {audioCourse.title}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 2, sm: 4 }}
        >
          <Typography variant="subtitle1" fontWeight="300" textAlign="center" whiteSpace="pre-line">
            {audioCourse.description}
          </Typography>
          {audioCourse?.path_to_url_audio && (
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
              <Button
                onClick={() => setIsCoverPlaying(!isCoverPlaying)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: 'divider',
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.5, sm: 0.7 },
                  width: { xs: '100%', sm: '100%' },
                }}
                fullWidth
              >
                <PlayPauseButton
                  isPlaying={isCoverPlaying}
                  sx={{ width: '30px', height: '30px' }}
                />
                <Typography variant="subtitle1" textTransform="none" sx={{ ml: 1 }}>
                  Аудио запись
                </Typography>
              </Button>
            </Box>
          )}
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center" gap={4} my={2}>
          <Typography variant="subtitle1" fontWeight="100" textAlign="center">
            {audioCourse.lessons.length} {audioCourse.lessons.length > 1 ? 'занятий' : 'занятие'}
          </Typography>
          <Typography variant="subtitle1" fontWeight="100" textAlign="center">
            {formatDuration(totalDuration)}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        width={{ xs: '100%', md: '660px' }}
        py={{ xs: 0, sm: 4 }}
      >
        {audioCourse.lessons.map((lesson) => (
          <ListenItem
            key={lesson.id}
            lesson={lesson}
            handlePlayPause={handlePlayPause}
            playing={playing}
          />
        ))}
      </Box>
    </Container>
  );
};

export default ListenList;
