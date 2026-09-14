const COLOR_CONFIG = {
  coldBlack: '#0B0F19',
  graffit: '#22222d',
  white: '#FFFFFF',
  warmWhite: '#EBEBEB',
  gray: '#767575',
  glas: '#0032A0',
  red: '#ff1a1f',
};

const UI_COLOR_CONFIG = {
  screenBackground: COLOR_CONFIG.coldBlack,
  cardBackground: COLOR_CONFIG.graffit,
  icon: COLOR_CONFIG.white,
  h1: COLOR_CONFIG.white,
};

const ICON_CONFIG = {
  size: {
    small: 24,
    medium: 36,
    large: 48,
  },
  hitSlop: {
    forSmall: 10,
    forMedium: 4,
  },
};

export const theme = {
  ICON_CONFIG,
  UI_COLOR_CONFIG,

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },

  typography: {
    h1: {
      fontFamily: 'Raleway-Bold',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 1,
      color: UI_COLOR_CONFIG.h1,
    },
    body: {
      fontFamily: 'Raleway-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: COLOR_CONFIG.warmWhite,
    },
    caption: {
      fontFamily: 'Raleway-Light',
      fontSize: 14,
      lineHeight: 20,
      color: COLOR_CONFIG.gray,
    },
  } as const,
};

export type TypographyVariant = keyof typeof theme.typography;

//NOTE: запасные оттенки
// graffit: '#1C1D1F',
//graffit2: '#303133',
// glas: '#397AFC'
