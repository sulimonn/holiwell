// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

// ==============================|| Loader ||============================== //

const Loader = () => (
  <LoaderWrapper>
    <Box position="absolute" bgcolor="white" height="100vh" width="100%" inset="-1"></Box>
    <LinearProgress sx={{ mt: 0 }} color="primary" />
  </LoaderWrapper>
);

export default Loader;
