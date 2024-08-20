import type { PropsWithChildren } from 'react';
import React from 'react';
import { ImageBackground } from 'react-native';

import { useThemeConfig } from '@/core/useThemeConfig';

type Props = PropsWithChildren<{}>;

export function Background({ children }: Props) {
  const theme = useThemeConfig();
  const bg = theme.dark
    ? require('assets/images/backgroundDark.png')
    : require('assets/images/backgroundLight.png');

  return (
    <ImageBackground
      testID="backgroundImage"
      source={bg}
      className="flex-1"
      imageStyle={{ transform: [{ rotate: '180deg' }] }}
    >
      {children}
    </ImageBackground>
  );
}
