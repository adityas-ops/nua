export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  surface: string;
  success: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

// RN has no CSS box-shadow equivalent — use these with the shadow
// props directly (iOS: shadowColor/shadowOffset/shadowOpacity/shadowRadius,
// Android: elevation).
export interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const lightColors: ThemeColors = {
  background: '#FCFAF6',
  foreground: '#19120D',
  card: '#FFFFFF',
  cardForeground: '#19120D',
  popover: '#FFFFFF',
  popoverForeground: '#19120D',
  primary: '#EE583E',
  primaryForeground: '#FFFDFA',
  secondary: '#F5EFE9',
  secondaryForeground: '#291F18',
  muted: '#F5EFE9',
  mutedForeground: '#7B6F66',
  accent: '#FFE6DC',
  accentForeground: '#971D08',
  destructive: '#E7000B',
  destructiveForeground: '#F8FAFC',
  border: '#E6E2DD',
  input: '#E6E2DD',
  ring: '#EE583E',
  surface: '#FFFFFF',
  success: '#349D62',
  chart1: '#F54900',
  chart2: '#009689',
  chart3: '#104E64',
  chart4: '#FFB900',
  chart5: '#FE9A00',
};

export const darkColors: ThemeColors = {
  background: '#110C09',
  foreground: '#F7F3EE',
  card: '#1E1814',
  cardForeground: '#F7F3EE',
  popover: '#1E1814',
  popoverForeground: '#F7F3EE',
  primary: '#FA785B',
  primaryForeground: '#150A07',
  secondary: '#29231E',
  secondaryForeground: '#F7F3EE',
  muted: '#29231E',
  mutedForeground: '#A59D95',
  accent: '#41251E',
  accentForeground: '#FFA37D',
  destructive: '#FF6467',
  destructiveForeground: '#F8FAFC',
  border: 'rgba(255, 255, 255, 0.10)',
  input: 'rgba(255, 255, 255, 0.14)',
  ring: '#FA785B',
  surface: '#1E1814',
  success: '#57BC80',
  chart1: '#1447E6',
  chart2: '#00BC7D',
  chart3: '#FE9A00',
  chart4: '#AD46FF',
  chart5: '#FF2056',
};

export const lightShadows = {
  card: {
    shadowColor: '#1D140D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  } as ThemeShadow,
  accent: {
    shadowColor: '#EE583E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 6,
  } as ThemeShadow,
};

export const darkShadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 4,
  } as ThemeShadow,
  accent: {
    shadowColor: '#FA785B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  } as ThemeShadow,
};
