import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { formatTime } from 'utils/formatTime';

const ListenItem = ({ lesson, handlePlayPause, playing, setTotalDuration }) => {
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    const audio = new Audio(lesson.path_to_audio);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setTotalDuration((prev) => {
        const previous = { ...prev }; // eslint-disable-next-line
        const total = prev[lesson.id] ? prev[lesson.id] + audio.duration : audio.duration;
        return previous;
      });
    });
    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
    };
  }, [lesson, playing, setTotalDuration]);

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
            onClick={() => handlePlayPause(lesson.id, lesson.path_to_audio)}
            disabled={duration === 0}
          >
            <Avatar
              sx={{
                bgcolor: duration === 0 ? 'primary.light' : 'primary.main',
                transition: 'all 0.3s',
              }}
            >
              {playing === lesson.id ? (
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
              component={Link}
              to={`/listen/${lesson.id}`}
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
              component={Link}
              to={`/trainers/${lesson.trainer.id}`}
              style={{ textDecoration: 'none', width: 'fit-content' }}
            >
              {lesson.trainer.first_name} {lesson.trainer.last_name}
            </Typography>
          }
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
        />
        <Typography
          variant="subtitle2"
          fontWeight="100"
          color="primary.main"
          component={Link}
          to={`/listen/${lesson.id}`}
        >
          <ArrowForwardIosIcon
            sx={{ fontSize: '0.95rem', color: 'primary.lihter', opacity: 0.5 }}
          />
        </Typography>
      </Box>
    </ListItem>
  );
};

export default ListenItem;
