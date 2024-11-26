import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
  Collapse,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { formatTime, timeToSeconds } from 'utils/formatTime';

const ListenItem = ({ lesson, handlePlayPause, playing, icon: Icon }) => {
  const [duration, setDuration] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    setDuration(timeToSeconds(lesson.audio_length));
  }, [lesson]);

  return (
    <ListItem
      divider
      sx={{
        py: { xs: 2.4, md: 2.7 },
        px: { xs: 0, md: 'inherit' },
        '&.MuiListItem-divider:last-of-type': {
          borderBottom: 'none',
        },
        flexWrap: 'wrap',
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight="100"
        color="primary.main"
        width="100%"
        textAlign="right"
      >
        {formatTime(duration)}
      </Typography>
      <Box display="grid" gridTemplateColumns="auto 1fr auto" width="100%" alignItems="center">
        <ListItemAvatar>
          <IconButton
            onClick={() =>
              Icon
                ? navigate(`/subscription/${lesson.course_type_slug}/${lesson.course_id}`)
                : handlePlayPause(lesson.id, lesson.path_to_audio)
            }
            disabled={duration === 0}
          >
            <Avatar
              sx={{
                bgcolor: duration === 0 ? 'primary.light' : 'primary.main',
                transition: 'all 0.3s',
              }}
            >
              {Icon ? (
                <Icon style={{ width: '20px', height: '20px' }} />
              ) : playing === lesson.id ? (
                <PauseIcon sx={{ fontSize: '1.75rem' }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: '1.75rem' }} />
              )}
            </Avatar>
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ textDecoration: 'none', display: 'block' }}
            >
              {lesson.title}
            </Typography>
          }
          secondary={
            <Typography
              variant="subtitle2"
              fontWeight="100"
              color="primary.main"
              mt={0.5}
              style={{ textDecoration: 'none', width: 'fit-content' }}
            >
              {lesson.trainer?.first_name} {lesson.trainer?.last_name}
            </Typography>
          }
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
        />
        <Button
          onClick={() => setOpen(!open)}
          sx={{ p: 0, textTransform: 'none' }}
          style={{ padding: 0 }}
          endIcon={
            <ArrowBackIosIcon
              sx={{
                width: '0.75rem',
                height: '0.75rem',
                color: 'primary.light',
                transform: open
                  ? 'rotate(90deg) translateX(3px)'
                  : 'rotate(-90deg) translateX(3px)',
              }}
            />
          }
        >
          <Typography variant="caption" color="primary.main" fontWeight="100">
            {open ? 'Скрыть' : 'Подробнее'}
          </Typography>
        </Button>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography
          variant="subtitle1"
          color="primary.main"
          fontWeight="100"
          sx={{ display: 'block', mt: 1 }}
        >
          {lesson.description}
        </Typography>
      </Collapse>
    </ListItem>
  );
};

export default ListenItem;
