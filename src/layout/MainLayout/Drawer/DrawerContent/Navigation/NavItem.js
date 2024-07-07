import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ListItemButton, ListItemText, Typography } from '@mui/material';

// project import
import { activeItem, openDrawer } from 'store/reducers/menu';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const { drawerOpen, openItem } = useSelector((state) => state.menu);

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(openDrawer({ drawerOpen: false }));
    dispatch(activeItem({ openItem: [id] }));
  };

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  // active menu item on page load
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'primary.contrastText';
  listItemProps = item.id === 'logout1' ? {} : { ...listItemProps };
  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={async () => {
        itemHandler(item.id);
        if (item.id === 'logout1') {
          await logout();
        }
      }}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        py: 1,
        '&.Mui-selected': {
          '&:hover': {},
        },
        '&:hover': {},
      }}
    >
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{
                color: textColor,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              {item.title}
            </Typography>
          }
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
