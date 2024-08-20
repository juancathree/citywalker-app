import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

type Props = {
  className?: string;
} & ViewProps;

export function Card({ children, className, ...rest }: Props) {
  return (
    <View className={`bg-cardLight dark:bg-cardDark ${className}`} {...rest}>
      {children}
    </View>
  );
}
