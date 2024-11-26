import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { Box, Typography, IconButton, Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

// project import
import Logo from 'components/Logo/Logo';
import { openProfile } from 'store/reducers/menu';
import Profile from '../Profile/index';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { isAuthenticated } = useAuth();
  const { profileOpen, pages } = useSelector((state) => state.menu);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <Box width="100%" backgroundColor="background.default">
      <Container
        maxWidth="lg"
        sx={{ height: '80px', display: 'flex', alignItems: 'center', gap: 17 }}
      >
        <Box width="160px" height="min-content" display="flex" alignItems="center">
          <Link to="/">
            <Logo />
          </Link>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            textAlign: 'center',
            justifyContent: 'left',
          }}
        >
          {pages.map((child, i) => {
            return (
              <Typography
                component={Link}
                to={'/' + child.slug}
                variant="h5"
                key={i}
                color="primary"
                textTransform="uppercase"
                sx={{
                  textDecoration: 'none ',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: 'text.secondary' },
                }}
              >
                {child.title}
              </Typography>
            );
          })}
          {isAuthenticated ? (
            <div ref={anchorRef} style={{ marginLeft: 'auto' }}>
              <IconButton color="inherit" onClick={() => dispatch(openProfile(!profileOpen))}>
                <PersonIcon />
              </IconButton>
              <Profile anchorRef={anchorRef} />
            </div>
          ) : (
            <Typography
              component={Link}
              to={'/login'}
              variant="h5"
              color="primary"
              textTransform="uppercase"
              sx={{
                textDecoration: 'none ',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'text.secondary' },
                ml: 'auto',
              }}
            >
              Войти
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeaderContent;
