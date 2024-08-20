import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core';
import { Text } from '@/ui';

type Props = {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
} & TouchableOpacityProps;

export function LoadingButton({
  text,
  onPress,
  isLoading = false,
  style,
  ...rest
}: Props) {
  const theme = useThemeConfig();
  return (
    <TouchableOpacity
      className="bg-primary"
      style={[style, styles.container]}
      activeOpacity={0.8}
      onPress={onPress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = {
  container: tailwind`w-2/3 items-center justify-center self-center rounded px-12 py-4 shadow`,
  text: tailwind`font-bold`,
};
