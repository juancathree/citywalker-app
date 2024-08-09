import React from 'react';
import { View as RNView } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';

type Props = React.ComponentProps<typeof RNView>;

export default function View({ children, ...rest }: Props) {
  const theme = useThemeConfig();
  return (
    <RNView style={tailwind`bg-[${theme.colors.background}]`} {...rest}>
      {children}
    </RNView>
  );
}
