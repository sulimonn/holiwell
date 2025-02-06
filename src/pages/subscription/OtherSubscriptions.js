import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from 'store/reducers/courses';
import SubscriptionForm from './SubscriptionForm';

const Medlis = () => {
  const { id } = useParams();
  const { data = {} } = useGetCourseQuery(id);

  return <SubscriptionForm course={data} />;
};

export default Medlis;
