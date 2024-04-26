import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Container, Typography, Grid } from '@mui/material';

// project import
import Logo from 'components/Logo/Logo';

// assets
import GooglePlay from 'assets/images/stores/googlePlay.png';
import AppStore from 'assets/images/stores/appStore.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      position="relative"
      bottom={0}
      width="100%"
      borderTop={1}
      borderColor="divider"
      pt={6.5}
      pb={3.5}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={4.5} textAlign="center">
            <Box display="flex" flexDirection="column" textAlign="left">
              <Box width="160px">
                <Logo />
              </Box>
              <Typography variant="h5" color="text.primary" fontWeight="300" my={1.5}>
                Скачайте приложение Holiwell, чтобы заниматься в любое время и в любом месте.
              </Typography>
              <Box display="flex" gap={2} mt={2}>
                <Box maxWidth="198px" maxHeight="60px">
                  <Link to="/">
                    <img
                      src={GooglePlay}
                      alt="Google Play"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Link>
                </Box>
                <Box maxWidth="198px" maxHeight="60px">
                  <Link to="/">
                    <img
                      src={AppStore}
                      alt="App Store"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7.5} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              © 2022. All rights reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
