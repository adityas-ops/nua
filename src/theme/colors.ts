export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  border: string;
  badgeColor: string;
}

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
  primary: '#EE583E',
  primaryForeground: '#FFFDFA',
  secondary: '#F5EFE9',
  muted: '#F5EFE9',
  mutedForeground: '#7B6F66',
  destructive: '#E7000B',
  border: '#E6E2DD',
  badgeColor: '#0F5132',
};

export const darkColors: ThemeColors = {
  background: '#110C09',
  foreground: '#F7F3EE',
  card: '#1E1814',
  primary: '#FA785B',
  primaryForeground: '#150A07',
  secondary: '#29231E',
  muted: '#29231E',
  mutedForeground: '#A59D95',
  destructive: '#FF6467',
  border: 'rgba(255, 255, 255, 0.10)',
  badgeColor: '#0F5132',
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
