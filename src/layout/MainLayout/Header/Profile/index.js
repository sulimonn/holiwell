import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Stack,
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

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile({ anchorRef }) {
  const [anchorEl, setAnchorEl] = useState();
  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);
  const dispatch = useDispatch();
  const { profileOpen: open } = useSelector((state) => state.menu);

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
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Stack>
                              <Typography variant="h6">John Doe</Typography>
                              <Typography variant="body2" color="text.secondary">
                                UI/UX Designer
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Logout">
                            <IconButton size="large" sx={{ color: 'text.primary' }}>
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
