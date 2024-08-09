import React from 'react';
import { View as RNView } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';

type Props = React.ComponentProps<typeof RNView>;

export default function Card({ children, style, ...rest }: Props) {
  const theme = useThemeConfig();
  return (
    <RNView style={[tailwind`bg-[${theme.colors.card}]`, style]} {...rest}>
      {children}
    </RNView>
  );
}
