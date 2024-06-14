import React, { useRef } from 'react';

import { Box, Container, Typography, Divider, Button } from '@mui/material';
import ListenItem from './ListenItem';
import Image from 'components/Image';
import { formatDuration } from 'utils/formatTime';
import TrainersList from 'components/TrainersList';
import Back from 'components/Back';
import { useSelector } from 'react-redux';
import ModalCalendar from 'pages/calendar/ModalCalendar';

const ListenList = () => {
  const { listen: audioCourse } = useSelector((state) => state.test);

  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [totalDuration, setTotalDuration] = React.useState({ total: 0, items: [] });

  const handleOpen = () => setOpen(true);
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
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Back to="/" sx={{ mt: 2, display: { xs: 'inherit', sm: 'none' } }} />
        <Box
          height={{ xs: '220px', sm: '500px' }}
          width={{ xs: '220px', sm: '100%' }}
          overflow="hidden"
          mx="auto"
          mt={{ xs: 7, sm: 0 }}
        >
          <Image
            src={require(`assets/images/girls/${audioCourse.path_to_cover}`)}
            alt="listen"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
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
          <Typography variant="subtitle1" fontWeight="300" textAlign="center">
            {audioCourse.description}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="500"
            textAlign="center"
            textTransform="uppercase"
            my={2}
          >
            {formatDuration(totalDuration.total)}
          </Typography>

          <Button variant="contained" onClick={handleOpen}>
            Обзор курса
          </Button>
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
              setTotalDuration={setTotalDuration}
            />
          ))}
        </Box>
        <Divider />
        <TrainersList />
      </Container>
      <ModalCalendar open={open} setOpen={setOpen} />
    </>
  );
};

export default ListenList;
