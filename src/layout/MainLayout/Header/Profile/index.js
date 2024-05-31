import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Typography,
  Box,
  Popper,
  Tooltip,
  IconButton,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { openProfile } from 'store/reducers/menu';
import { useLogoutMutation } from 'store/reducers/authApi';
import { logOut } from 'store/reducers/auth';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile({ anchorRef }) {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState();
  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);
  const dispatch = useDispatch();
  const { profileOpen: open } = useSelector((state) => state.menu);
  const { user } = useSelector((state) => state.auth);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    dispatch(openProfile(false));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      {anchorEl && (
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 24],
                },
              },
            ],
          }}
          sx={{
            boxShadow: 'none',
            borderRadius: 0,
            '& .MuiPaper-root': {
              borderRadius: 0,
              boxShadow: 'none',
              backgroundColor: 'background.default',
            },
          }}
        >
          {({ TransitionProps }) => (
            <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
              <Paper
                sx={{
                  width: 290,
                  minWidth: 240,
                  maxWidth: { xs: 250, md: 290 },
                  borderRadius: 0,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, py: 1 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography variant="h6">
                            {user?.first_name} {user?.last_name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Выйти">
                            <IconButton
                              size="large"
                              sx={{ color: 'text.primary' }}
                              onClick={async () => {
                                const response = await logout();
                                if (response) {
                                  navigate('/login');
                                  dispatch(openProfile(false));
                                  dispatch(logOut());
                                }
                              }}
                            >
                              <LogoutOutlined />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </Popper>
      )}
    </Box>
  );
}
