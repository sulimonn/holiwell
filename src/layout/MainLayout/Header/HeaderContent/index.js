import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { Box, Typography, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

// project import
import menuItems from 'menu-items/index';
import Logo from 'components/Logo/Logo';
import { openProfile } from 'store/reducers/menu';
import Profile from '../Profile/index';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { isAuthenticated } = useAuth();
  const { profileOpen } = useSelector((state) => state.menu);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between', py: 3 }}
    >
      <Box width="160px" height="min-content" display="flex" alignItems="center">
        <Link to="/">
          <Logo />
        </Link>
      </Box>
      {[]
        .concat(
          ...menuItems.items.map((item) =>
            isAuthenticated ? item.id === 'pages' && item.children : item.children,
          ),
        )
        .filter((child) => !child.mobile)
        .map((child, i) => {
          return (
            <Typography
              component={Link}
              to={child.url}
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
      {isAuthenticated && (
        <div ref={anchorRef}>
          <IconButton color="inherit" onClick={() => dispatch(openProfile(!profileOpen))}>
            <PersonIcon />
          </IconButton>
          <Profile anchorRef={anchorRef} />
        </div>
      )}
    </Box>
  );
};

export default HeaderContent;
