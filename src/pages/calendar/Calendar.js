import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCalendar from 'react-calendar';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import './Calendar.css';
import Back from 'components/Back';
import { formatDateToLocalISO } from 'utils/formatTime';

const Calendar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [localdate, setDate] = React.useState(new Date());
  const [localnextdate, setNextDate] = React.useState(localdate);
  const [local2nextdate, set2NextDate] = React.useState(localdate);
  React.useEffect(() => {
    setNextDate(() => {
      let newDate = new Date(localdate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    set2NextDate(() => {
      let newDate = new Date(localdate);
      newDate.setMonth(newDate.getMonth() + 2);
      return newDate;
    });
  }, [localdate]);
  const onChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <Box width="100%">
      <Box py={{ xs: 2, md: 6 }} bgcolor="background.paper" display={{ xs: 'none', md: 'block' }}>
        <Typography
          variant="h1"
          textAlign="center"
          textTransform={{ xs: 'capitalize', md: 'uppercase' }}
        >
          Календарь
        </Typography>
      </Box>
      <Container sx={{ position: { xs: 'static', md: 'relative' } }}>
        <Back to={'/profile'} title="Календарь" sx={{ display: { xs: 'flex', md: 'none' } }} />

        <Box
          sx={{
            width: '100%',
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
            '& .react-calendar__navigation__arrow': { display: 'none' },
            '& .react-calendar__month-view__days__day--neighboringMonth abbr, & .react-calendar__month-view__days__day--neighboringMonth div':
              {
                opacity: 0,
              },
            '& .react-calendar__month-view__days__day--neighboringMonth': {
              pointerEvents: 'none',
            },
          }}
          display="flex"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          justifyContent="center"
          alignItems="center"
          bgcolor="common.white"
          my={{ xs: 8, md: 5 }}
          pt={5}
          pb={3}
          px={3}
        >
          <ReactCalendar
            value={localdate}
            onChange={onChange}
            showDoubleView={false}
            maxDetail="month"
            minDetail="month"
            tileContent={({ date, view }) =>
              view === 'month' && (
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  mt={1}
                  mx="auto"
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'background.default',
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    bgcolor={view === 'month' ? 'primary.lighter' : null}
                    width="100%"
                    height="100%"
                  ></Box>
                  <Box
                    bgcolor={view === 'month' ? 'error.light' : null}
                    width="100%"
                    height="100%"
                  ></Box>
                </Box>
              )
            }
            navigationLabel={({ date, label, locale, view }) =>
              view === 'month' ? date.toLocaleDateString(locale, { month: 'long' }) : label
            }
            onClickDay={(value) => navigate(`/calendar/${formatDateToLocalISO(value)}`)}
            locale="ru-RU"
          />
          <ReactCalendar
            value={localnextdate}
            onChange={onChange}
            showDoubleView={false}
            maxDetail="month"
            minDetail="month"
            tileContent={({ date, view }) =>
              view === 'month' && (
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  mt={1}
                  mx="auto"
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'background.default',
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    bgcolor={view === 'month' ? 'primary.lighter' : null}
                    width="100%"
                    height="100%"
                  ></Box>
                  <Box
                    bgcolor={view === 'month' ? 'error.light' : null}
                    width="100%"
                    height="100%"
                  ></Box>
                </Box>
              )
            }
            navigationLabel={({ date, label, locale, view }) =>
              view === 'month' ? date.toLocaleDateString(locale, { month: 'long' }) : label
            }
            onClickDay={(value) => {
              navigate(`/calendar/${formatDateToLocalISO(value)}`);
            }}
            locale="ru-RU"
          />
          <ReactCalendar
            value={local2nextdate}
            onChange={onChange}
            showDoubleView={false}
            maxDetail="month"
            minDetail="month"
            tileContent={({ date, view }) =>
              view === 'month' && (
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  mt={1}
                  mx="auto"
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'background.default',
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    bgcolor={view === 'month' ? 'primary.lighter' : null}
                    width="100%"
                    height="100%"
                  ></Box>
                  <Box
                    bgcolor={view === 'month' ? 'error.light' : null}
                    width="100%"
                    height="100%"
                  ></Box>
                </Box>
              )
            }
            navigationLabel={({ date, label, locale, view }) =>
              view === 'month' ? date.toLocaleDateString(locale, { month: 'long' }) : label
            }
            onClickDay={(value) => navigate(`/calendar/${formatDateToLocalISO(value)}`)}
            locale="ru-RU"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Calendar;
