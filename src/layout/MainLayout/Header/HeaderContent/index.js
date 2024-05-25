// material-ui
import { Box, Typography, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

// project import
import menuItems from 'menu-items/index';
import Logo from 'components/Logo/Logo';

import { useSelector } from 'react-redux';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { isAuth } = useSelector((state) => state.auth);
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
            isAuth ? item.id === 'pages' && item.children : item.children,
          ),
        )
        .filter((child) => !child.mobile)
        .map((child) => {
          return (
            <Typography
              component={Link}
              to={child.url}
              variant="h5"
              key={child.title}
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
      {isAuth && (
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default HeaderContent;
