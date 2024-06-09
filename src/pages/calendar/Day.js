import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/system';

import Icon from '@ant-design/icons';

import Back from 'components/Back';
import Plus from 'assets/images/icons/plus';
import down from 'assets/images/icons/down';
import RadioChecked from 'assets/images/icons/RadioChecked';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  width: 580,
  boxShadow: 'none',
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
  const [selectedValue, setSelectedValue] = React.useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const lessons = [
    {
      id: 0,
      title: 'Заголовок',
      trainer: {
        first_name: 'Имя',
        last_name: 'Фамилия',
        path_to_avatar: 'avatar-1.png',
        slogan: '',
      },
      path_to_cover: 'courses2.jpeg',
      type: 'training',
    },
    {
      id: 1,
      title: 'Заголовок',
      trainer: {
        first_name: 'Имя',
        last_name: 'Фамилия',
        path_to_avatar: 'avatar-1.png',
        slogan: '',
      },
      path_to_cover: 'intro.jpeg',
      type: 'training',
    },
  ];
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
      to: `/listen`,
    },
  ];
  const handleCardClick = (value) => {
    setSelectedValue(value);
  };
  return (
    <>
      <Box width="100%">
        <Box py={{ xs: 2, md: 6 }} bgcolor="background.paper" width="100%">
          <Typography
            variant="h1"
            textAlign="center"
            fontWeight="500"
            textTransform={{ xs: 'capitalize', md: 'uppercase' }}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {formatDateInRussian(day)}
          </Typography>
        </Box>
        <Container maxWidth="lg" sx={{ position: { xs: 'static', md: 'relative' } }}>
          <Back to={`/calendar`} text={formatDateInRussian(day)} />
          <Box display="flex" alignItems="center" justifyContent="center" my={7}>
            <FormControl component="fieldset">
              <RadioGroup value={selectedValue} onChange={handleChange}>
                {lessons.map((course, index) => (
                  <>
                    {index > 0 && <Divider sx={{ mb: 2 }} />}
                    <StyledCard key={index} onClick={() => handleCardClick(course.id)}>
                      <StyledCardMedia
                        image={require('assets/images/girls/' + course.path_to_cover)}
                        title={course.title}
                      />
                      <StyledCardContent>
                        <Typography component="h5" variant="h5">
                          {course.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {course.type}
                        </Typography>
                      </StyledCardContent>
                      <FormControlLabel
                        value={course.id}
                        control={<Radio checkedIcon={<RadioChecked />} />}
                        label=""
                        labelPlacement="end"
                      />
                    </StyledCard>
                  </>
                ))}
              </RadioGroup>
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
              <>
                {' '}
                <Button
                  key={item.title}
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
              </>
            ))}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Day;
