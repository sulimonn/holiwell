import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

import { Box, Slider, IconButton, Typography, Menu } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import Forward10RoundedIcon from '@mui/icons-material/Forward10Rounded';
import Replay10RoundedIcon from '@mui/icons-material/Replay10Rounded';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Icon from '@ant-design/icons';

import { formatTime } from 'utils/formatTime';
import VolumeIcon from 'assets/images/icons/volume';
import fullScreen from 'assets/images/icons/fullScreen';

const VideoPlayer = ({ path_to_video, duration, setDuration }) => {
  const videoRef = useRef();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playedProgress, setPlayedProgress] = useState(0);
  const [played, setPlayed] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const [overlay, setOverlay] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const getVideoHeight = () => {
    if (isXs) return '260px';
    if (isSm) return '550px';
    if (isMdUp) return '675px';
    return '260px';
  };

  const height = getVideoHeight();

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const handleSeekChange = (event, newValue) => {
    setPlayedProgress(newValue / 100);
    videoRef.current.seekTo(newValue / 100);
  };
  const handleRewind = () => {
    const currentTime = videoRef.current.getCurrentTime();
    videoRef.current.seekTo(currentTime - 15);
  };

  const handleFastForward = () => {
    const currentTime = videoRef.current.getCurrentTime();
    videoRef.current.seekTo(currentTime + 15);
  };

  const handleProgress = (state) => {
    if (!videoRef.current.seeking) {
      setPlayedProgress(state.played);

      if (!duration) {
        setDuration(videoRef.current.getDuration());
        console.log(1);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current.wrapper.requestFullscreen) {
      videoRef.current.wrapper.requestFullscreen();
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.getInternalPlayer().volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.getDuration());
    }
  }, [setDuration]);

  useEffect(() => {
    if (videoRef.current) {
      setPlayed(videoRef.current.getCurrentTime());
    }
  }, [playedProgress]);

  const VolumeUpIcon = (props) => <Icon component={VolumeIcon} {...props} />;
  const FullscreenIcon = (props) => <Icon component={fullScreen} {...props} />;

  useEffect(() => {
    const showOverlay = (icon) => {
      setOverlay(icon);
      setOverlayVisible(true);
      setTimeout(() => setOverlayVisible(false), 1000);
    };
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setPlaying((prev) => {
          showOverlay(prev ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />);
          return !prev;
        });
      }
      if (event.code === 'ArrowUp') {
        event.preventDefault();
        setVolume((prev) => {
          const newValue = Math.min(prev + 0.1, 1);
          showOverlay(Math.round(newValue * 100) + '%');
          return newValue;
        });
      }
      if (event.code === 'ArrowDown') {
        event.preventDefault();
        setVolume((prev) => {
          const newValue = Math.max(prev - 0.1, 0);
          showOverlay(Math.round(newValue * 100) + '%');
          return newValue;
        });
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        handleRewind();
        showOverlay(<Replay10RoundedIcon fontSize="large" />);
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        handleFastForward();
        showOverlay(<Forward10RoundedIcon fontSize="large" />);
      }
      if (event.code === 'KeyF') {
        event.preventDefault();
        handleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Box height={{ xs: '360px', sm: '550px', md: '675px' }} width="100%" position="relative" mb={4}>
      <Box onClick={handlePlayPause}>
        <ReactPlayer
          ref={videoRef}
          width="100%"
          height={height}
          url={path_to_video}
          playing={playing}
          onProgress={handleProgress}
          volume={volume}
        />
      </Box>

      <Box
        position="absolute"
        top="0%"
        left="0%"
        width="100%"
        height="100%"
        color="white"
        p={2}
        borderRadius={4}
        zIndex={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          opacity: overlayVisible ? 1 : 0,
          transition: 'opacity 0.25s ease-in-out',
        }}
      >
        <Box
          width={{ xs: '100px', sm: '120px', md: '260px' }}
          height={{ xs: '100px', sm: '120px', md: '260px' }}
          bgcolor={overlayVisible ? 'rgba(0, 0, 0, 0.2)' : 'transparent'}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          sx={{
            transition: 'all 0.25s ease-in-out',
            filter: 'blur(60px)',
            position: 'absolute',
            zIndex: -1,
          }}
        ></Box>
        <Typography
          variant="h4"
          color="primary.contrastText"
          sx={{
            transform: 'scale(2.5)',
          }}
        >
          {overlay}
        </Typography>
      </Box>
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
        zIndex={4}
      >
        <IconButton onClick={handlePlayPause} color="inherit">
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Typography
          variant="subtitle1"
          fontWeight="100"
          sx={{
            whiteSpace: 'nowrap',
            width: { xs: '36px', md: '40px' },
            textAlign: 'center',
            mx: 2,
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
            width: { xs: '36px', md: '40px' },
            textAlign: 'center',
            mx: 2,
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
    </Box>
  );
};

export default VideoPlayer;
