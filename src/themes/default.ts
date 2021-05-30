import {createTheme} from 'baseui'
import { ThemePrimitives } from 'baseui/theme';

const primitives: Partial<ThemePrimitives> = {
    accent: '#004D40',
    accent50: '#E0F2F1',
    accent100: '#80CBC4',
    accent200: '#26A69A',
    accent300: '#00796B',
    accent400: '#004d40',
    accent500: '#003d33',
    accent600: '#002e26',
    accent700: '#001e19',
  };

const overrides = {
  colors: {

  }
}

const theme = createTheme(primitives, overrides)

export default theme