import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get('Success');
  //const paymentId = searchParams.get('PaymentId');
  //const orderId = searchParams.get('OrderId');
  const order = JSON.parse(localStorage.getItem('order'));
  localStorage.removeItem('order');

  if (success === 'true') {
    return navigate(`/${order?.type}/${order?.id}`);
  }
  return <></>;
};

export default Success;
