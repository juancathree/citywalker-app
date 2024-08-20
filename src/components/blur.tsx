import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { useThemeConfig } from '@/core';

export function Blur() {
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
        style={styles.blur}
      />
    );
  }

  return <View className="h-full bg-cardLight dark:bg-cardDark" />;
}

const styles = {
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
};
