// material-ui
import { Button, Stack } from '@mui/material';

// ==============================|| FIREBASE - SOCIAL ICON ||============================== //
import Icon, { AppleFilled } from '@ant-design/icons';

import VK from 'assets/images/icons/vk.js';

const FirebaseSocial = () => {
  const VkIcon = (props) => <Icon component={VK} {...props} />;
  const appleHandler = async () => {
    // login || singup
  };

  const vkHandler = async () => {
    // login || singup
  };

  return (
    <Stack
      direction="row"
      justifyContent={'center'}
      sx={{
        '& .MuiButton-startIcon': { mr: 0, ml: 0 },
        gap: '20px',
      }}
    >
      <Button
        color="primary"
        variant="contained"
        size="large"
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          p: 2,
          minWidth: 'unset',
          '& .MuiButton-startIcon': { mr: 0, ml: 0 },
        }}
        startIcon={<VkIcon style={{ fontSize: '2.4rem' }} />}
        onClick={vkHandler}
      />
      <Button
        color="primary"
        variant="contained"
        size="large"
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          p: 2,
          minWidth: 'unset',
          '& .MuiButton-startIcon': { mr: 0, ml: 0 },
        }}
        startIcon={
          <AppleFilled style={{ fontSize: '2.1rem', position: 'relative', top: '-2px' }} />
        }
        onClick={appleHandler}
      />
    </Stack>
  );
};

export default FirebaseSocial;
