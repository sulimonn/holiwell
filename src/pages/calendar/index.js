import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCalendar from 'react-calendar';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Icon from '@ant-design/icons';
import down from 'assets/images/icons/down';
import './Calendar.css';

const Calendar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [localdate, setDate] = React.useState(new Date());

  const ArrowIcon = (props) => <Icon component={down} {...props} />;

  const onChange = (newDate) => {
    setDate(newDate);
  };
  return (
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
      }}
      display="flex"
      justifyContent="center"
    >
      <ReactCalendar
        value={localdate}
        onChange={onChange}
        showDoubleView={false}
        maxDetail="month"
        minDetail="year"
        nextLabel={<ArrowIcon style={{ transform: 'rotate(-90deg)', opacity: 0.5 }} />}
        prevLabel={<ArrowIcon style={{ transform: 'rotate(90deg)', opacity: 0.5 }} />}
        tileContent={({ date, view }) =>
          view === 'month' && (
            <Box
              width="10px"
              height="10px"
              borderRadius="50%"
              mt={1}
              mx="auto"
              sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'background.default' }}
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
        onClickDay={(value) => navigate(`/calendar/${value.toISOString().slice(0, 10)}`)}
        locale="ru-RU"
      />
    </Box>
  );
};

export default Calendar;
