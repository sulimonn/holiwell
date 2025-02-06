import React from 'react';

import {
  Stack,
  Typography,
  Container,
  Divider,
  Button,
  Modal,
  CircularProgress,
} from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import WarningIcon from 'assets/images/icons/warning';
import { useDeactivateProfileMutation } from 'store/reducers/userApi';
import FailIcon from 'assets/images/icons/FailIcon';
import SuccessIcon from 'assets/images/icons/SuccessIcon';

const Subscription = () => {
  const [deactivate, { isLoading: isDeactivating }] = useDeactivateProfileMutation();
  const [deactivated, setDeactivated] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDeactivated(false);
    setOpen(false);
  };

  const handleDeactivate = async () => {
    const response = await deactivate();

    if (!response?.error) {
      setDeactivated(true);
      setTimeout(() => {
        handleClose();
        window.location.replace('/login');
      }, 2000);
      return;
    }
    setDeactivated('error');
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          sx={{
            width: { xs: 350, md: 400 },
            bgcolor: 'background.default',
            boxShadow: 24,
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 6 },
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
          }}
        >
          {deactivated === 'error' ? (
            <Stack alignItems="center" spacing={2}>
              <FailIcon />
              <Typography id="modal-modal-description" textAlign="center">
                Произошло ошибка при удалении аккаунта
              </Typography>
              <Button variant="contained" onClick={() => setDeactivated(false)}>
                Попробовать снова
              </Button>
            </Stack>
          ) : deactivated ? (
            <Stack alignItems="center" spacing={2}>
              <SuccessIcon />
              <Typography id="modal-modal-description" textAlign="center">
                Аккаунт успешно удален
              </Typography>
            </Stack>
          ) : (
            <>
              <Stack alignItems="center">
                <WarningIcon />
                <Typography id="modal-modal-description" sx={{ mt: 2 }} textAlign="center">
                  Вы действительно хотите удалить аккаунт?
                </Typography>
              </Stack>
              <Stack mt={4} direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" onClick={handleDeactivate} disabled={isDeactivating}>
                  {isDeactivating ? <CircularProgress size={20} /> : 'Да'}
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  Нет
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Modal>
      <Container maxWidth="lg">
        <Stack my={4} spacing={1}>
          <Typography variant="h2" textTransform="uppercase" fontWeight="300">
            Статус
          </Typography>
          <Typography variant="body1" fontWeight="100">
            Ваша подписка закончится 7 февраля, 2025.
          </Typography>
          <Stack pt={3}>
            <Divider />
            <Button
              variant="standard"
              endIcon={<ArrowForwardIos />}
              sx={{
                justifyContent: 'space-between',
                paddingLeft: '0 !important',
                paddingRight: '0 !important',
                py: 4,
                textTransform: 'none',
              }}
            >
              Оформить годовую подписку
            </Button>
            <Divider />
            <Button
              variant="standard"
              endIcon={<ArrowForwardIos />}
              sx={{
                justifyContent: 'space-between',
                paddingLeft: '0 !important',
                paddingRight: '0 !important',
                py: 4,
                textTransform: 'none',
              }}
            >
              Приостановить подписку
            </Button>
            <Divider />
            <Button
              color="error"
              endIcon={<ArrowForwardIos />}
              sx={{
                justifyContent: 'space-between',
                paddingLeft: '0 !important',
                paddingRight: '0 !important',
                py: 4,
                textTransform: 'none',
              }}
              onClick={handleOpen}
            >
              Удалить аккаунт
            </Button>
            <Divider />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Subscription;
