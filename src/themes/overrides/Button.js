// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200],
      borderColor: theme.palette.grey[200],
    },
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
          textDecoration: 'none',
          textTransform: 'uppercase',
          borderRadius: 5,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 12.5,
          paddingBottom: 12.5,
          lineHeight: 0.8,
          [theme.breakpoints.down('sm')]: {
            paddingLeft: 23,
            paddingRight: 23,
            paddingTop: 10,
            paddingBottom: 10,
          },
        },
        contained: {
          ...disabledStyle,
          borderColor: theme.palette.primary.main,
          borderWidth: 1.5,
          borderStyle: 'solid',
          '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
          },
        },
        outlined: {
          ...disabledStyle,
          borderColor: theme.palette.primary.main,
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        },
      },
    },
  };
}
