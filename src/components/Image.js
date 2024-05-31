import React from 'react';
import { useImage } from 'react-image';

const Image = (props) => {
  const { src } = useImage({
    srcList: [props.src],
  });

  return <img src={src} alt={props.alt} {...props} />;
};

export default Image;
