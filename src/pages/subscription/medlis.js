import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from 'store/reducers/courses';
import Subscription from './index';

const Medlis = () => {
  const { id } = useParams();
  const { data = {} } = useGetCourseQuery(id);

  return <Subscription course={data} />;
};

export default Medlis;
