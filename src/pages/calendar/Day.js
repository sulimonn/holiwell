import React from 'react';
import { useParams } from 'react-router-dom';

const Day = () => {
  const { date } = useParams();
  return <div>{date}</div>;
};

export default Day;
