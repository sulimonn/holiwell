import React, { useState, useEffect } from 'react';

import { Box, Slider, IconButton, Typography, Menu } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import Forward10RoundedIcon from '@mui/icons-material/Forward10Rounded';
import Replay10RoundedIcon from '@mui/icons-material/Replay10Rounded';
import Icon from '@ant-design/icons';

import { formatTime } from 'utils/formatTime';
import VolumeIcon from 'assets/images/icons/volume';
import fullScreen from 'assets/images/icons/fullScreen';

const Controls = ({
  mediaRef,
  duration,
  media = 'audio',
  handlePlayPause,
  setPlaying,
  playing,
  playedProgress,
  setPlayedProgress,
  containerRef,
}) => {
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const handleSeekChange = (event, newValue) => {
    setPlayedProgress(newValue / 100);
    mediaRef.current.currentTime = newValue / 100;
  };
  const handleRewind = () => {
    const currentTime = mediaRef.current.getCurrentTime();
    mediaRef.current.currentTime = currentTime - 10;
  };

  const handleFastForward = () => {
    const currentTime = mediaRef.current.getCurrentTime();
    mediaRef.current.currentTime = currentTime + 10;
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        /* Safari */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        /* IE11 */
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (media === 'video') {
      if (mediaRef.current && mediaRef.current.getInternalPlayer()) {
        mediaRef.current.getInternalPlayer().volume = volume;
      }
    } else {
      mediaRef.current.volume = volume;
    }
  }, [volume, mediaRef, media]);

  useEffect(() => {
    if (mediaRef.current) {
      if (media === 'video') setPlayed(mediaRef.current.getCurrentTime());
      else setPlayed(mediaRef.current.currentTime);
    }
  }, [playedProgress, mediaRef, media]);

  useEffect(() => {
    if (mediaRef.current) {
      setPlayed(mediaRef.current.currentTime);
    }
  }, [mediaRef]);

  const VolumeUpIcon = (props) => <Icon component={VolumeIcon} {...props} />;
  const FullscreenIcon = (props) => <Icon component={fullScreen} {...props} />;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setPlaying((prev) => {
          if (!prev) mediaRef.current.play();
          else mediaRef.current.pause();
          return !prev;
        });
      }
      if (event.code === 'ArrowUp') {
        event.preventDefault();
        setVolume((prev) => Math.min(prev + 0.1, 1));
      }
      if (event.code === 'ArrowDown') {
        event.preventDefault();
        setVolume((prev) => Math.round(prev * 100));
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        handleRewind();
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        handleFastForward();
      }
      if (event.code === 'KeyF') {
        event.preventDefault();
        handleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }; // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Box
      position="absolute"
      bottom="0"
      left="0"
      width="100%"
      py={0.3}
      px={13}
      bgcolor="common.white"
      display="flex"
      alignItems="center"
      gap={0}
      zIndex={5}
    >
      <IconButton
        onClick={handleRewind}
        sx={{ color: 'primary.main', opacity: 0.8 }}
        disabled={played <= 0}
      >
        <Replay10RoundedIcon />
      </IconButton>
      <IconButton onClick={handlePlayPause} color="inherit">
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton
        onClick={handleFastForward}
        sx={{ color: 'primary.main', opacity: 0.8 }}
        disabled={played >= duration}
      >
        <Forward10RoundedIcon />
      </IconButton>
      <Typography
        variant="subtitle1"
        fontWeight="100"
        sx={{
          whiteSpace: 'nowrap',
          minWidth: { xs: '36px', md: '40px' },
          textAlign: 'center',
          mr: 2,
          ml: 0.5,
        }}
      >
        {formatTime(played)}
      </Typography>
      <Slider
        value={playedProgress * 100}
        onChange={handleSeekChange}
        aria-labelledby="continuous-slider"
        sx={{ color: 'primary.main' }}
      />
      <Typography
        variant="subtitle1"
        fontWeight="100"
        sx={{
          whiteSpace: 'nowrap',
          minWidth: { xs: '36px', md: '40px' },
          textAlign: 'center',
          ml: 2,
          mr: 0.5,
        }}
      >
        {formatTime(duration - played)}
      </Typography>
      <IconButton onClick={handleFullscreen} color="primary.main">
        <FullscreenIcon />
      </IconButton>
      <IconButton
        aria-controls="volume-up"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <VolumeUpIcon />
      </IconButton>
      <Menu
        id="volume-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
          },
          '& .MuiList-root': {
            p: 0,
          },
        }}
      >
        <Box sx={{ px: 1, py: 2, backgroundColor: 'background.default' }}>
          <Slider
            value={volume * 100}
            onChange={handleVolumeChange}
            aria-labelledby="continuous-slider"
            orientation="vertical"
            sx={{ color: 'primary.main', height: '100px' }}
          />
        </Box>
      </Menu>
    </Box>
  );
};

export default Controls;