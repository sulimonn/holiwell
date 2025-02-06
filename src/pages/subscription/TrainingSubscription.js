import React from 'react';
import { useGetCourseQuery } from 'store/reducers/courses';
import SubscriptionForm from './SubscriptionForm';

const TrainingSubscription = () => {
  const { data = {} } = useGetCourseQuery(25);
  return <SubscriptionForm course={data} />;
};

export default TrainingSubscription;
