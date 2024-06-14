import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import LessonPageBase from 'components/LessonPageBase';
import Controls from 'components/Controls';
import Image from 'components/Image';

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

const ListenPage = () => {
  const { id } = useParams();
  const lesson = useSelector((state) => state.test.listen).lessons.find(
    (lesson) => lesson.id === parseInt(id),
  );

  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playedProgress, setPlayedProgress] = useState(0);
  const [overlay, setOverlay] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hideControlsTimeout, setHideControlsTimeout] = useState(null);
  const [mouseOverControls, setMouseOverControls] = useState(false);

  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleProgress = useCallback(() => {
    setPlayedProgress(audioRef.current.currentTime / audioRef.current.duration);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(lesson.path_to_audio);
    const audio = audioRef.current;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', handleProgress);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleProgress);
    };
  }, [handleProgress, lesson.path_to_audio]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const showControls = useCallback(() => {
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    setControlsVisible(true);
    setHideControlsTimeout(
      setTimeout(() => {
        if (!mouseOverControls) {
          setControlsVisible(false);
        }
      }, 3000),
    );
  }, [hideControlsTimeout, mouseOverControls]);

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
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
    <LessonPageBase
      cover={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: { xs: 260, sm: 550, md: 675 },
            position: 'relative',
          }}
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
          >
            <Box component="audio" ref={audioRef} sx={{ display: 'none' }} />
            <Image
              src={require(`assets/images/girls/${lesson.path_to_cover}`)}
              alt="cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
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
          {
            <Controls
              duration={duration}
              playing={playing}
              setPlaying={setPlaying}
              mediaRef={audioRef}
              handlePlayPause={handlePlayPause}
              playedProgress={playedProgress}
              setPlayedProgress={setPlayedProgress}
              containerRef={containerRef}
              setOverlay={setOverlay}
              setOverlayVisible={setOverlayVisible}
              media="audio"
              visible={controlsVisible}
              onMouseEnter={() => setMouseOverControls(true)}
              onMouseLeave={() => setMouseOverControls(false)}
            />
          }
        </Box>
      }
      lesson={lesson}
      btnContained={
        <Button
          onClick={handlePlayPause}
          variant="contained"
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          {playing ? 'Пауза' : 'Слушать'}
        </Button>
      }
      btnOutlined={<Button variant="outlined">В избранное</Button>}
      duration={duration}
    />
  );
};

export default ListenPage;
