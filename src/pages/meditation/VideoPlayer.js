import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Box, Typography, Skeleton } from '@mui/material';
import Controls from 'components/Controls';

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const VideoPlayer = ({ path_to_video, duration, setDuration, playing, setPlaying }) => {
  const videoRef = useRef();
  const containerRef = useRef();

  const [playedProgress, setPlayedProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hideControlsTimeout, setHideControlsTimeout] = useState(null);
  const [mouseOverControls, setMouseOverControls] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (!videoRef.current.seeking) {
      setPlayedProgress(state.played);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.getDuration());
    }
  }, [loading, setDuration]);

  const showControls = useCallback(() => {
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    setControlsVisible(true);
    setHideControlsTimeout(
      setTimeout(() => {
        if (!mouseOverControls) {
          setControlsVisible(false);
          console.log('hide');
        }
      }, 3000),
    );
  }, [hideControlsTimeout, mouseOverControls]);

  useEffect(() => {
    const handleMouseMove = throttle(() => {
      showControls();
    }, 300);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchstart', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchstart', handleMouseMove);
      }
    };
  }, [showControls]);

  return (
    <Box
      height={{ xs: '360px', sm: '550px', md: '675px' }}
      width="100%"
      position="relative"
      mb={4}
      ref={containerRef}
    >
      <Box
        onClick={handlePlayPause}
        position="relative"
        zIndex={1}
        display={loading ? 'none' : 'flex'}
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        bgcolor="primary.main"
      >
        <ReactPlayer
          ref={videoRef}
          width="100%"
          height="100%"
          url={path_to_video}
          playing={playing}
          onProgress={handleProgress}
          playsinline
          controls={false}
          onReady={(e) => {
            setLoading(false);
            setDuration(e.getDuration());
          }}
        />
      </Box>
      {loading && <Skeleton variant="rectangular" width="100%" height="100%" />}

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

      {!loading && (
        <Controls
          mediaRef={videoRef}
          media="video"
          playing={playing}
          setPlaying={setPlaying}
          handlePlayPause={handlePlayPause}
          playedProgress={playedProgress}
          setPlayedProgress={setPlayedProgress}
          duration={duration}
          setOverlay={setOverlay}
          setOverlayVisible={setOverlayVisible}
          containerRef={containerRef}
          visible={controlsVisible}
          onMouseEnter={() => setMouseOverControls(true)}
          onMouseLeave={() => setMouseOverControls(false)}
        />
      )}
    </Box>
  );
};

export default VideoPlayer;
