import PropTypes from 'prop-types';

// material-ui
import { List, Typography } from '@mui/material';

// project import
import NavItem from './NavItem';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const { isAuthenticated } = useAuth();
  const navCollapse = item.children?.map((menuItem) => {
    if (!isAuthenticated && menuItem.id === 'logout1') return null;
    if (isAuthenticated && menuItem.id === 'login1') return null;
    switch (menuItem.type) {
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      sx={{
        py: 2,
        zIndex: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        mx: 'auto',
        width: '60%',
        '&:last-child': {
          borderBottom: 0,
          borderColor: 'transparent',
        },
      }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
