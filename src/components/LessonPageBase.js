import { Link } from 'react-router-dom';

import { Box, Container, Typography, Divider } from '@mui/material';
import { formatTime } from 'utils/formatTime';
import Avatar from './Avatar';

const LessonPageBase = ({ cover, lesson, duration, btnOutlined, btnContained }) => {
  return (
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
              sx={{ whiteSpace: 'pre-line', display: { xs: 'none', md: 'block' } }}
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
                display: { xs: 'none', md: 'block' },
              }}
            >
              Подробнее
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LessonPageBase;
