import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';
import Text from '@/ui/text';

type Props = {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
  [key: string]: any;
};

export function LoadingButton({
  text,
  onPress,
  isLoading = false,
  ...rest
}: Props) {
  const theme = useThemeConfig();
  return (
    <TouchableOpacity
      testID="loading-button"
      className="w-2/3 items-center justify-center self-center rounded bg-primary px-12 py-4 shadow"
      activeOpacity={0.8}
      onPress={onPress}
      {...rest}
    >
      {!isLoading ? (
        <Text style={tailwind`font-bold`}>{text}</Text>
      ) : (
        <ActivityIndicator color={theme.colors.text} />
      )}
    </TouchableOpacity>
  );
}
