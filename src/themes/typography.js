// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (theme) => ({
  htmlFontSize: 16,
  fontFamily: "'Geologica', sans-serif",
  textDecoration: 'none',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 500,
    fontSize: '2.5rem',
    lineHeight: 1.21,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  h2: {
    fontWeight: 400,
    lineHeight: 1.2,
    fontSize: '2.25rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  h3: {
    fontWeight: 400,
    fontSize: '1.75rem',
    lineHeight: 1.17,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  h4: {
    fontWeight: 400,
    fontSize: '1.25rem',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  h5: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },
  h6: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.2,
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1,
  },
  body1: {
    fontSize: '1.25rem',
    lineHeight: 1.2,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  body2: {
    fontSize: '0.95rem',
    lineHeight: 1.2,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 300,
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 300,
    lineHeight: 1.2,
  },
  overline: {
    lineHeight: 1.2,
  },
  button: {
    textTransform: 'uppercase',
    fontSize: '1.25rem',
    fontWeight: 400,
    textAlign: 'center',
  },
  button2: {
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    fontWeight: 400,
    textAlign: 'right',
  },
});

export default Typography;
