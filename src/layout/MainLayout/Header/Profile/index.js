import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Divider,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { openProfile } from 'store/reducers/menu';
import { useAuth } from 'contexts/AuthContext';

// assets

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile({ anchorRef }) {
  const { logout } = useAuth();
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

  const menu = [
    [
      {
        name: 'Профиль',
        link: '/profile',
        type: 'item',
      },
    ],
    [
      {
        name: 'Поддержка',
        link: '/support',
        type: 'title',
      },
      {
        name: 'Телеграм-чат',
        link: '/',
        type: 'item',
      },
      {
        name: 'Holiwel@mail.com',
        link: 'mailto:Holiwel@mail.com',
        type: 'item',
      },
    ],
    [
      {
        name: 'Телеграм',
        link: '/',
        type: 'item',
        disabled: true,
      },
    ],
    [
      {
        name: 'Подписка',
        link: '/subscription',
        type: 'item',
        disabled: true,
      },
    ],
  ];

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
                  offset: [0, 20],
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
                    <CardContent sx={{ px: 4, py: 1 }}>
                      <Grid container justifyContent="center" spacing={2.5}>
                        {menu.map((item, index) => (
                          <>
                            {index !== 0 && (
                              <Divider
                                variant="middle"
                                color="divider"
                                sx={{ width: '90%', mt: 2.5 }}
                              />
                            )}
                            <Grid item xs={12}>
                              <Box display="flex" flexDirection="column" gap={1.6}>
                                {item.map((el) => (
                                  <div key={el.name}>
                                    {el.type === 'title' ? (
                                      <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        sx={{ textDecoration: 'none' }}
                                      >
                                        {el.name}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        component={Link}
                                        to={el.link}
                                        variant="h5"
                                        color={el.disabled ? 'text.secondary' : 'primary'}
                                        textTransform="uppercase"
                                        sx={{ textDecoration: 'none' }}
                                        onClick={() => dispatch(openProfile(false))}
                                      >
                                        {el.name}
                                      </Typography>
                                    )}
                                  </div>
                                ))}
                              </Box>
                            </Grid>
                          </>
                        ))}
                        <Grid item xs={12}>
                          <Box display="flex" flexDirection="column" gap={1.6}>
                            <Typography
                              variant="h5"
                              color={'text.secondary'}
                              textTransform="uppercase"
                              sx={{ textDecoration: 'none', cursor: 'pointer' }}
                              onClick={async () => {
                                await logout();
                                dispatch(openProfile(false));
                              }}
                            >
                              Выход
                            </Typography>
                          </Box>
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
