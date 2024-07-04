import React from 'react';
import ReactCalendar from 'react-calendar';

//material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Modal, Button, IconButton } from '@mui/material';
import Icon from '@ant-design/icons';
import down from 'assets/images/icons/down';
import './Calendar.css';
import Delete from 'assets/images/icons/Delete';
import { usePlanLessonMutation } from 'store/reducers/userApi';
import { formatDateToLocalISO } from 'utils/formatTime';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: { xs: '90%', sm: 400 },
  width: '100%',
  bgcolor: 'common.white',
  borderRadius: '10px',
  boxShadow: 24,
  px: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pb: 3,
};

const ModalCalendar = ({ open, setOpen, lesson_id }) => {
  const theme = useTheme();
  const [localdate, setDate] = React.useState(new Date());

  const [planLesson, { isLoading }] = usePlanLessonMutation();

  const handleClose = async () => {
    const form = new FormData();
    form.append('lesson_id', lesson_id);
    form.append('timestamp', formatDateToLocalISO(localdate) + ' 00:00:00');

    const response = await planLesson(form);
    if (!response?.error) {
      setOpen(false);
    }
  };

  const ArrowIcon = (props) => <Icon component={down} {...props} />;
  const CloseIcon = (props) => <Icon component={Delete} {...props} />;

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: { xs: '-5px', sm: '-35px' },
            top: { xs: '-45px', sm: '-35px' },
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: { xs: '90%', md: '100%' },
            flex: 1,
            '--text-primary': theme.palette.text.primary,
            '--text-secondary': theme.palette.text.secondary,
            '--text-disabled': theme.palette.text.disabled,
            '--font-family': theme.typography.fontFamily,
            '--color-primary-main': theme.palette.primary.main,
            '--color-primary-light': theme.palette.primary.light,
            '--color-primary-lighter': theme.palette.primary.lighter,
            '--color-primary-dark': theme.palette.primary.dark,
            '--color-secondary-main': theme.palette.secondary.main,
            '--color-secondary-light': theme.palette.secondary.light,
            '--color-secondary-dark': theme.palette.secondary.dark,
            '--color-error-main': theme.palette.error.main,
            '--color-error-light': theme.palette.error.light,
            '--color-error-dark': theme.palette.error.dark,
            '--color-warning-main': theme.palette.warning.main,
            '--color-warning-light': theme.palette.warning.light,
            '--color-warning-dark': theme.palette.warning.dark,
            '--color-info-main': theme.palette.info.main,
            '--color-info-light': theme.palette.info.light,
            '--color-info-dark': theme.palette.info.dark,
            '--color-success-main': theme.palette.success.main,
            '--color-success-light': theme.palette.success.light,
            '--color-success-dark': theme.palette.success.dark,
            '--color-primary-contrastText': theme.palette.primary.contrastText,
            '--color-secondary-contrastText': theme.palette.secondary.contrastText,
            '--color-error-contrastText': theme.palette.error.contrastText,
            '--background-default': theme.palette.background.default,
            '--background-paper': theme.palette.background.paper,
            '--white': theme.palette.common.white,
            '--margin': theme.spacing(2),
            '& .react-calendar__tile--active': {
              backgroundColor: '#EE562D',
              color: 'common.white',
              transition: 'all 0.2s ease',
            },
            '& .react-calendar__tile': {
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 1,
              borderRadius: '50%',
            },
            '& .react-calendar__tile::after': {
              bottom: '-25% !important',
            },
            '& .react-calendar__month-view__weekdays__weekday::after': {
              bottom: '0 !important',
            },
            '& .react-calendar__month-view__weekdays,& .react-calendar__month-view__days ': {
              columnGap: { xs: '0.4em !important', md: '0.75em' },
            },
          }}
          display="flex"
          justifyContent="center"
        >
          <ReactCalendar
            value={localdate}
            onChange={onChange}
            showDoubleView={false}
            maxDetail="month"
            minDetail="month"
            nextLabel={<ArrowIcon style={{ transform: 'rotate(-90deg)', opacity: 0.5 }} />}
            prevLabel={<ArrowIcon style={{ transform: 'rotate(90deg)', opacity: 0.5 }} />}
            navigationLabel={({ date, label, locale, view }) =>
              view === 'month' ? date.toLocaleDateString(locale, { month: 'long' }) : label
            }
            locale="ru-RU"
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ width: { xs: '248px', md: '300px' } }}
          disabled={isLoading}
        >
          Выбрать
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCalendar;
