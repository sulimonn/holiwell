// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

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
        contast: '#F8F8F8',
      },
      action: {
        disabled: '#A2A2A2',
      },
      divider: '#D9D9D9',
      background: {
        paper: '#A2A2A20D',
        default: '#f4f4f4',
      },
    },
  });
};

export default Palette;
