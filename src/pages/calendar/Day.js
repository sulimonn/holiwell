import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  Box,
  Typography,
  Container,
  Stack,
  Button,
  Modal,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/system';

import Icon from '@ant-design/icons';

import Back from 'components/Back';
import Plus from 'assets/images/icons/plus';
import down from 'assets/images/icons/down';
import CheckBoxChecked from 'assets/images/icons/RadioChecked';
import Radio from 'assets/images/icons/radio';
import {} from 'store/reducers/courses';
import { useGetCalendarQuery } from 'store/reducers/userApi';
import { typeOfLesson } from 'utils/other';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  width: '100%',
  boxShadow: 'none',
  borderRadius: 0,
  cursor: 'pointer',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 100,
  height: 100,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
}));

function formatDateInRussian(date) {
  const day = date.getDate();
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  // Format the date in Russian
  return `${day} ${monthNames[date.getMonth()]}`;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '275px',
  bgcolor: 'common.white',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: 3,
  px: 2,
};

const Day = () => {
  const navigate = useNavigate();
  const { date } = useParams();
  const day = new Date(date);
  const { data: lessons = [] } = useGetCalendarQuery();

  const handleChange = (event, id) => {};

  const [open, setOpen] = React.useState(false);
  const menu = [
    {
      title: 'Тренировки',
      to: `/training`,
    },
    {
      title: 'Медитации',
      to: `/meditation`,
    },
    {
      title: 'Аудио-курсы',
      to: `/listening`,
    },
  ];

  const handleCardClick = (id) => {
    // setLessons(
    //   lessons.map((lesson) => {
    //     if (lesson.id === id) {
    //       return {
    //         ...lesson,
    //         checked: !lesson.checked,
    //       };
    //     }
    //     return lesson;
    //   }),
    // );
  };
  return (
    <>
      <Box width="100%">
        <Box
          py={{ xs: 2, md: 6 }}
          bgcolor="background.paper"
          width="100%"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            fontWeight="500"
            textTransform={{ xs: 'capitalize', md: 'uppercase' }}
          >
            {formatDateInRussian(day)}
          </Typography>
        </Box>
        <Container maxWidth="lg" sx={{ position: { xs: 'static', md: 'relative' } }}>
          <Back to={`/calendar`} text={formatDateInRussian(day)} />
          <Box display="flex" alignItems="center" justifyContent="center" my={7}>
            <FormControl
              component="fieldset"
              sx={{ width: '100%', maxWidth: { xs: '100%', sm: 580 } }}
            >
              {lessons
                .filter((lesson) => lesson?.timestamp.includes(day.toISOString().slice(0, 10)))
                .map((lesson, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider sx={{ mb: 2 }} />}
                    <Link
                      to={`/${lesson.lesson.course_type_slug}/${lesson.lesson.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <StyledCard onClick={() => handleCardClick(lesson.id)}>
                        <StyledCardMedia
                          image={lesson.lesson.path_to_cover}
                          title={lesson.lesson.title}
                        />
                        <StyledCardContent>
                          <Typography component="h5" variant="h5">
                            {lesson.lesson.title}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {typeOfLesson(lesson.lesson.course_type_slug)}
                          </Typography>
                        </StyledCardContent>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checkedIcon={<CheckBoxChecked />}
                              icon={<Radio />}
                              checked={lesson.lesson.checked}
                              onChange={(event) => handleChange(event, lesson.id)}
                            />
                          }
                          label=""
                          labelPlacement="start"
                        />
                      </StyledCard>
                    </Link>
                  </React.Fragment>
                ))}
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" mb={7}>
            <Button
              endIcon={<Icon component={Plus} />}
              sx={{ flexDirection: 'column', gap: 1 }}
              onClick={() => setOpen(true)}
            >
              <Typography variant="subtitle1" fontWeight="300" color="text.secondary">
                Добавить занятие
              </Typography>
            </Button>
          </Box>
        </Container>
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Stack direction="column" spacing={0.5} sx={{ width: '100%' }}>
            <Typography
              variant="h4"
              color="text.secondary"
              textTransform="uppercase"
              sx={{ pb: 1.5 }}
            >
              ДОБАВИТЬ ЗАНЯТИЕ
            </Typography>
            <Divider />
            {menu.map((item) => (
              <React.Fragment key={item.title}>
                <Button
                  onClick={() => {
                    setOpen(false);
                    navigate(item.to);
                  }}
                  sx={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    justifyContent: 'space-between',
                    paddingLeft: '5px !important',
                    paddingRight: '5px !important',
                    textTransform: 'none',
                  }}
                  endIcon={
                    <Icon
                      component={down}
                      style={{ transform: 'rotate(-90deg)', fontSize: '1px', opacity: 0.5 }}
                    />
                  }
                >
                  <Typography variant="body2">{item.title}</Typography>
                </Button>
                <Divider />
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Day;
