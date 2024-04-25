// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000',
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);
  paletteColor.primary = {
    ...paletteColor.primary,
    dark: '#121212',
    main: '#303030',
    light: '#A2A2A2',
    lighter: '#D9D9D9',
    contrastText: '#F8F8F8',
  };

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#252525',
        white: '#F8F8F8',
      },
      ...paletteColor,
      text: {
        primary: '#121212',
        secondary: '#A2A2A2',
        disabled: '#A2A2A2',
      },
      action: {
        disabled: '#A2A2A2',
      },
      divider: '#D9D9D9',
      background: {
        paper: '#f4f4f4',
        default: '#f4f4f4',
      },
    },
  });
};

export default Palette;
