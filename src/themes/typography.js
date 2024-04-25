// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (fontFamily) => ({
  htmlFontSize: 16,
  fontFamily,
  textDecoration: 'none',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 500,
    fontSize: '2.5rem',
    lineHeight: 1.21,
  },
  h2: {
    fontWeight: 400,
    fontSize: '2.25rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 400,
    fontSize: '1.75rem',
    lineHeight: 1.17,
  },
  h4: {
    fontWeight: 400,
    fontSize: '1.25rem',
  },
  h5: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  h6: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.57,
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
  },
  body1: {
    fontSize: '1.25rem',
    lineHeight: 1.57,
    fontWeight: 300,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.66,
    fontWeight: 300,
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.57,
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.66,
  },
  overline: {
    lineHeight: 1.66,
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
