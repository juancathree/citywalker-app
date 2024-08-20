import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

type Props = {} & ViewProps;

export function Divider({ style, ...rest }: Props) {
  return (
    <View
      className="h-[.3] w-full bg-textLight dark:bg-textDark"
      style={style}
      {...rest}
    />
  );
}
