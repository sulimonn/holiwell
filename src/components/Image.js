import React, { useEffect, useState, useRef } from 'react';
import { Skeleton } from '@mui/material';
import { useImage } from 'react-image';

const Image = (props) => {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const source = props.src;
  const { src } = useImage({
    srcList: [source],
  });

  const onLoad = () => {
    setIsLoaded(true);
  };

  const onError = () => {
    setHasError(true);
  };

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    const img = imageRef.current;
    if (img && img?.complete) {
      setIsLoaded(true);
    }
  }, [source]);

  useEffect(() => {
    const img = imageRef.current;
    if (img && img?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {!isLoaded && !hasError && (
        <Skeleton variant="rectangular" width={props.width} height={props.height} {...props} />
      )}

      <img
        ref={imageRef}
        key={source} // Ensure React re-renders the image when the src changes
        src={src}
        alt={props.alt}
        {...props}
        loading="lazy"
        onLoad={onLoad}
        onError={onError}
        style={{
          ...props.style,
          display: { xs: 'inherit', md: isLoaded ? 'block' : 'none' },
          transition: 'opacity 0.5s ease-in-out',
          opacity: { xs: 1, md: isLoaded ? 1 : 0 },
        }}
      />

      {hasError && (
        <div
          style={{
            width: props.width,
            height: props.height,
            backgroundColor: 'grey',
          }}
        >
          Image failed to load
        </div>
      )}
    </>
  );
};

export default Image;
