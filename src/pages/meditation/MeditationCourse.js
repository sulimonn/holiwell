import React from 'react';
import { Box, Container, Divider, Typography, Button, Stack } from '@mui/material';
import Image from 'components/Image';
import Back from 'components/Back';
import { useGetCourseQuery } from 'store/reducers/courses';
import ListenItem from 'components/ListenItem';
import PlayPauseButton from 'components/PlayPauseButton';
import Icon from '@ant-design/icons';
import lock from 'assets/images/icons/lock';
import { addSeconds, formatDuration, timeToSeconds } from 'utils/formatTime';

const Meditation = () => {
  const { data: videoCourse, isFetching } = useGetCourseQuery(2);
  const LockedIcon = (props) => <Icon component={lock} {...props} />;

  const audioRef = React.useRef(new Audio());
  const [playing, setPlaying] = React.useState(null);
  const [totalDuration, setTotalDuration] = React.useState(0);

  const coverRef = React.useRef(new Audio());
  const [isCoverPlaying, setIsCoverPlaying] = React.useState(false);

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
    if (audio) {
      if (videoCourse?.lessons?.length > 0) {
        setTotalDuration((prev) =>
          addSeconds(videoCourse.lessons.map((lesson) => timeToSeconds(lesson.audio_length))),
        );
      }
      audio.onended = () => {
        setPlaying(null);
      };
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [videoCourse]);

  React.useEffect(() => {
    if (coverRef.current) {
      coverRef.current = new Audio(videoCourse?.path_to_url_audio);

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
  }, [videoCourse, isCoverPlaying]);

  if (isFetching) return;

  return (
    <>
      <Back to="/" sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }} color="white" />
      <Box width="100%">
        <Box
          width="100%"
          height={{ xs: '360px', sm: '420px', md: '500px' }}
          position="relative"
          sx={{
            '& img': {
              objectPosition: { xs: 'center', md: 'top center' },
              mb: { xs: 3, md: 4 },
            },
          }}
        >
          <Image
            src={process.env.REACT_APP_BASE_URL + videoCourse.path_to_cover}
            alt="cover"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              filter: 'brightness(0.6)',
              zIndex: 1,
            }}
            load="lazy"
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
        <Container maxWidth="lg">
          <Box
            mt={{ xs: 4, md: 5 }}
            mb={{ xs: 4, md: 7 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 2, md: 4 }}
          >
            <Typography
              variant="h1"
              fontWeight="500"
              color="text.primary"
              textAlign="center"
              textTransform="uppercase"
            >
              {videoCourse.title}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={{ xs: 100, sm: '300' }}
              color="text.primary"
              textAlign="center"
            >
              Курс медитаций
            </Typography>
            <Box
              width={{ xs: '100%', md: '580px' }}
              mx="auto"
              display="flex"
              flexDirection="column"
            >
              <Typography variant="body2" fontWeight="300" textAlign={{ xs: 'left', md: 'center' }}>
                {videoCourse.description}
              </Typography>

              {videoCourse?.path_to_url_audio && (
                <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                  <Button
                    onClick={() => setIsCoverPlaying(!isCoverPlaying)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      borderRadius: '50px',
                      border: '1px solid',
                      borderColor: 'divider',
                      px: { xs: 1, sm: 1 },
                      py: { xs: 0.5, sm: 0.5 },
                      mt: 2,
                    }}
                    fullWidth
                  >
                    <PlayPauseButton
                      isPlaying={isCoverPlaying}
                      sx={{ width: '38px', height: '38px' }}
                    />
                    <Typography variant="body2" textTransform="none" sx={{ ml: 1 }}>
                      Аудио запись
                    </Typography>
                  </Button>
                </Box>
              )}
            </Box>
            <Stack direction="row" justifyContent="center" alignItems="center" gap={4} my={2}>
              <Typography variant="subtitle1" fontWeight="100" textAlign="center">
                {videoCourse.lessons.length}{' '}
                {videoCourse.lessons.length > 1 ? 'занятий' : 'занятие'}
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
            {videoCourse.lessons.map((lesson, index) => (
              <ListenItem
                key={lesson.id}
                lesson={lesson}
                handlePlayPause={handlePlayPause}
                playing={playing}
                icon={LockedIcon}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Meditation;
