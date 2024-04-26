// material-ui
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// project import
import menuItems from 'menu-items/index';
import Logo from 'components/Logo/Logo';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
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
        .concat(...menuItems.items.map((item) => item.children))
        .filter((child) => !child.mobile)
        .map((child) => {
          return (
            <Typography
              component={Link}
              to={child.url}
              variant="h5"
              key={child.id}
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
    </Box>
  );
};

export default HeaderContent;
