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

const ListenItem = ({ lesson, audioRef, handlePlayPause, setPlaying, playing, duration }) => {
  const [isPlaying, setIsPlaying] = React.useState(lesson.id === playing);

  React.useEffect(() => {
    if (playing === lesson.id) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [playing, lesson]);
  return (
    <ListItem
      divider
      sx={{
        py: 2.7,
        '&.MuiListItem-divider:first-of-type': {
          borderTop: '1px solid',
          borderTopColor: 'divider',
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
          <IconButton onClick={() => handlePlayPause(lesson.id, lesson.path_to_audio)}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {playing === lesson.id && isPlaying ? (
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