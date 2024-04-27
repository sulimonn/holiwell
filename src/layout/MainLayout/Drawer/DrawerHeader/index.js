import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo/Logo';
import { openDrawer } from 'store/reducers/menu';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(openDrawer({ drawerOpen: false }));
  };

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Box
        component={Link}
        to="/"
        sx={{ textDecoration: 'none' }}
        width="160px"
        onClick={handleDrawerClose}
      >
        <Logo mode="light" />
      </Box>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
