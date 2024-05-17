import React from 'react';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
const PlayPauseButton = ({ isPlaying, ...props }) => {
  return !isPlaying ? (
    <PlayCircleFilledRoundedIcon {...props} />
  ) : (
    <PauseCircleFilledRoundedIcon {...props} />
  );
};

export default PlayPauseButton;
