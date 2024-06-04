import React from 'react';
import { useParams } from 'react-router-dom';

const Subscription = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Subscription;
