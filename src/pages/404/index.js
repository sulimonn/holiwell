import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Page404 = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
      flexDirection="column"
    >
      <Typography variant="h1" fontSize="4rem">
        404
      </Typography>
      <Typography variant="h2">Страница не найдена</Typography>
      <Typography variant="body1" component={Link} to="/" color="text.secondary">
        Вернуться на главную
      </Typography>
    </Box>
  );
};

export default Page404;
