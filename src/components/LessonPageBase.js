import { Link } from 'react-router-dom';

import { Box, Container, Typography, Divider } from '@mui/material';
import { formatTime } from 'utils/formatTime';
import Avatar from './Avatar';

const LessonPageBase = ({ cover, lesson, duration, btnOutlined, btnContained }) => {
  return (
    <Container maxWidth="lg">
      {cover}
      <Box py={7}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h1">{lesson.title}</Typography>
          <Box display="flex" alignItems="center" my={3} gap={6}>
            <Typography variant="body2" fontWeight="300">
              {lesson.trainer.first_name} {lesson.trainer.last_name}
            </Typography>
            <Typography variant="body2">{formatTime(duration)}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            {btnContained}
            {btnOutlined}
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box py={7} textAlign="center" width={{ xs: '100%', md: '50%' }} mx="auto">
        <Typography variant="h3" textTransform="uppercase">
          Описание урока
        </Typography>
        <Typography
          variant="body2"
          fontWeight="300"
          my={3}
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
        py={7}
        textAlign="center"
        width={{ xs: '100%', md: '60%' }}
        mx="auto"
        display="flex"
        gap={3}
      >
        <Avatar avatar={lesson.trainer.path_to_avatar} />
        <Box textAlign="left" display="flex" flexDirection="column" gap={2} justifyContent="center">
          <Typography variant="body2"> Тренер урока</Typography>
          <Typography fontWeight="300" variant="h3">
            {lesson.trainer.first_name} {lesson.trainer.last_name}
          </Typography>
          <Typography variant="body2">{lesson.trainer.description}</Typography>

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
  );
};

export default LessonPageBase;
