import React from 'react';

import ArrowCustom from 'assets/images/icons/arrow';

// material-ui
import { IconButton, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@ant-design/icons';

const Back = ({ to, title, ...other }) => {
  const Arrow = (props) => <Icon {...props} component={ArrowCustom} />;
  const sx = {
    ...other?.sx,
  };
  return (
    <Box
      width={title ? '100%' : 'min-content'}
      sx={{
        px: { xs: 2, md: 0 },
        position: 'absolute',
        left: 0,
        top: { xs: 10, md: 50 },
        zIndex: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <IconButton
        component={RouterLink}
        to={to}
        color={other?.color || 'primary'}
        sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, p: 0, height: 'auto' }}
      >
        <Arrow style={{ fontSize: '1.25rem' }} />
      </IconButton>
      {title && (
        <Typography
          variant="h1"
          textAlign="center"
          fontWeight={{ xs: '400' }}
          fontSize={{ xs: '1.25rem' }}
          color="text.primary"
          textTransform="lowercase"
          sx={{
            display: { xs: 'block', md: 'none', '&::first-letter': { textTransform: 'uppercase' } },
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default Back;
