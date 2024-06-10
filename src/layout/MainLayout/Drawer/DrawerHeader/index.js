import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import Icon from '@ant-design/icons';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo/Logo';
import { openDrawer } from 'store/reducers/menu';
import Delete from 'assets/images/icons/Delete';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(openDrawer({ drawerOpen: false }));
  };
  const CloseIcon = (props) => <Icon component={Delete} />;

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
      <IconButton onClick={handleDrawerClose} sx={{ position: 'absolute', right: 5 }}>
        <CloseIcon />
      </IconButton>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
