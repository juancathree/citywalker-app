import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';

export default function Blur() {
  const platform = Platform.OS;
  const theme = useThemeConfig();

  if (platform === 'ios') {
    return (
      <BlurView
        intensity={40}
        tint={
          theme.dark ? 'systemThickMaterialDark' : 'systemThickMaterialLight'
        }
        experimentalBlurMethod="dimezisBlurView"
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: 'hidden',
        }}
      />
    );
  }

  return <View style={tailwind`h-100 bg-[${theme.colors.card}]`} />;
}
