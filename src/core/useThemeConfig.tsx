import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import colors from '@/ui/colors';

type ExtendedTheme = {
  colors: {
    placeholder: string;
    buttonText: string;
    error: string;
    success: string;
  };
} & Theme;

const DarkTheme: ExtendedTheme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary,
    background: colors.backgroundDark,
    text: colors.textDark,
    card: colors.cardDark,
    placeholder: colors.placeHolderDark,
    buttonText: colors.textLight,
    error: colors.errorDark,
    success: colors.success,
  },
};

const LightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.backgroundLight,
    text: colors.textLight,
    card: colors.cardLight,
    placeholder: colors.placeHolderLight,
    buttonText: colors.textDark,
    error: colors.errorLight,
    success: colors.success,
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
