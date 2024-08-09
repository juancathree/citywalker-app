import React from 'react';
import { Text as RNText } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';

type Props = React.ComponentProps<typeof RNText>;

export default function Text({ children, style, ...rest }: Props) {
  const theme = useThemeConfig();
  return (
    <RNText
      {...rest}
      className="font-kaushan"
      style={[
        tailwind`text-[${theme.colors.text}]`,
        style,
        { fontFamily: 'kaushan' },
      ]}
    >
      {children}
    </RNText>
  );
}
