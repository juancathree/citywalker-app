import React from 'react';
import { ImageBackground } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';

type Props = {
  children: React.ReactNode;
};

export function Background({ children }: Props) {
  const theme = useThemeConfig();
  const bg = theme.dark
    ? require('assets/images/backgroundDark.png')
    : require('assets/images/backgroundLight.png');
  return (
    <ImageBackground source={bg} style={tailwind`flex-1`}>
      {children}
    </ImageBackground>
  );
}
