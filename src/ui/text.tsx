import React from 'react';
import type { TextProps } from 'react-native';
import { Text as RNText } from 'react-native';

type Props = {
  className?: string;
} & TextProps;

export function Text({ children, className, ...rest }: Props) {
  return (
    <RNText
      {...rest}
      className={`text-textLight dark:text-textDark ${className}`}
      {...rest}
    >
      {children}
    </RNText>
  );
}
