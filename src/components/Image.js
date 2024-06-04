import React from 'react';
import { Skeleton } from '@mui/material';
import { useImage } from 'react-image';

const Image = (props) => {
  const [loadState, setLoadState] = React.useState(false);
  const [customProps, setCustomProps] = React.useState({
    ...props,
    style: { ...props.style, display: loadState ? 'block' : 'none' },
  });
  const { src } = useImage({
    srcList: [props.src],
  });
  const onLoad = () => setLoadState(true);

  React.useEffect(() => {
    setCustomProps({ ...props, style: { ...props.style, display: loadState ? 'block' : 'none' } });
  }, [props, loadState]);
  return (
    <>
      <img src={src} alt={props.alt} {...customProps} loading="lazy" onLoad={onLoad} />{' '}
      {!loadState && (
        <Skeleton variant="rectangular" width={props.width} height={props.height} {...props} />
      )}
    </>
  );
};

export default Image;
