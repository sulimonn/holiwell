import React from 'react';

import { Container } from '@mui/material';

const ListenCourseBase = ({ title, children, cover }) => {
  return <Container maxWidth="lg">{children}</Container>;
};

export default ListenCourseBase;
