import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Container, Typography, Divider, Button } from '@mui/material';
import { formatTime } from 'utils/formatTime';
import Avatar from './Avatar';
import Icon from '@ant-design/icons';
import CalendarIcon from 'assets/images/icons/Calendar';
import ModalCalendar from 'pages/calendar/ModalCalendar';

const LessonPageBase = ({ cover, lesson, duration, btnOutlined, btnContained }) => {
  const [open, setOpen] = React.useState(false);
  const Calendar = (props) => <Icon component={CalendarIcon} {...props} />;

  return (
    <>
      <ModalCalendar open={open} setOpen={setOpen} />
      <Box width="100%">
        <Container maxWidth="lg" sx={{ px: { xs: 0, md: 2 } }}>
          {cover}
        </Container>
        <Container maxWidth="lg">
          <Box pt={{ xs: 0, md: 7 }} pb={{ xs: 4, md: 7 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h1">{lesson.title}</Typography>
              <Box display="flex" alignItems="center" my={3} gap={6}>
                <Typography variant="body2" fontWeight="300" sx={{ textAlign: 'center' }}>
                  {lesson.trainer.first_name} {lesson.trainer.last_name}
                </Typography>
                <Typography variant="body2">{formatTime(duration)}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                {btnContained}
                {btnOutlined}
              </Box>
              <Button
                size="small"
                endIcon={<Calendar style={{ opacity: 0.5 }} />}
                sx={{ p: 1, mt: 3 }}
                onClick={() => setOpen(true)}
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
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Подробнее
              </Typography>
            </Box>
            <br />
            <Box display={{ xs: 'contents', sm: 'none' }} flex={1} width="100%">
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', my: 3 }} textAlign="left">
                {lesson.trainer.description}
              </Typography>

              <Typography
                component={Link}
                to={`/trainers/${lesson.trainer.id}`}
                variant="body2"
                textTransform="uppercase"
                color="primary.main"
              >
                Подробнее
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LessonPageBase;
