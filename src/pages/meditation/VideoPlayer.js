import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';

import { Box, Typography } from '@mui/material';
import Controls from 'components/Controls';

const VideoPlayer = ({ path_to_video, duration, setDuration, playing, setPlaying }) => {
  const videoRef = useRef();
  const containerRef = useRef();

  const [playedProgress, setPlayedProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (!videoRef.current.seeking) {
      setPlayedProgress(state.played);
    }
  };
  React.useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.getDuration());
    }
  }, [loading, setDuration]);

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
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        bgcolor="primary.main"
      >
        <ReactPlayer
          ref={videoRef}
          width="100%"
          height={'100%'}
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
        />
      )}
    </Box>
  );
};

export default VideoPlayer;
