import React from 'react';
import type { ViewProps } from 'react-native';
import { View as RNView } from 'react-native';

type Props = {
  className?: string;
} & ViewProps;

export function View({ children, className, ...rest }: Props) {
  return (
    <RNView
      className={`bg-backgroundLight dark:bg-backgroundDark ${className}`}
      {...rest}
    >
      {children}
    </RNView>
  );
}
