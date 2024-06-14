import React from 'react';
import { Box, Container, Divider, Typography, Button } from '@mui/material';
import MeditationCard from './MeditationCard';
import TrainersList from 'components/TrainersList';
import Image from 'components/Image';
import ModalCalendar from 'pages/calendar/ModalCalendar';
import Back from 'components/Back';
import { useSelector } from 'react-redux';

const Meditation = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { meditation: videoCourse } = useSelector((state) => state.test);
  return (
    <>
      <ModalCalendar open={open} setOpen={setOpen} />
      <Back to="/" sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }} color="white" />
      <Box width="100%">
        <Box width="100%" height={{ xs: '360px', sm: '420px', md: '500px' }}>
          <Image
            src={require('assets/images/girls/' + videoCourse.path_to_cover)}
            alt="cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            load="lazy"
          />
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
            <Button variant="contained" onClick={handleOpen}>
              Обзор курса
            </Button>
          </Box>
          <Divider />
          <Box width={{ xs: '100%', md: '580px' }} mx="auto" my={{ xs: 4, md: 7 }}>
            <Typography variant="body2" fontWeight="300" textAlign={{ xs: 'left', md: 'center' }}>
              {videoCourse.description}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              rowGap: 5,
              columnGap: 1,
              justifyContent: 'space-between',
              py: 6,
            }}
          >
            {videoCourse.lessons.map((lesson, index) => (
              <MeditationCard
                key={lesson.id}
                lesson={lesson}
                isSubscribed={true}
                index={index + 1}
              />
            ))}
          </Box>
          <Divider />
          <TrainersList />
        </Container>
      </Box>
    </>
  );
};

export default Meditation;
