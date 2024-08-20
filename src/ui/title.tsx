import { t } from 'i18next';
import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { useThemeConfig } from '@/core/useThemeConfig';

import { Image } from './image';
import { Text } from './text';

type Props = {} & ViewProps;

export function Title({ ...rest }: Props) {
  const theme = useThemeConfig();
  const image = theme.dark
    ? require('assets/images/citywalkerDark.png')
    : require('assets/images/citywalkerLight.png');

  return (
    <View {...rest} testID="title">
      <Image
        source={image}
        className="h-20 w-80"
        contentFit="cover"
        transition={1000}
      />
      <Text>{t('screens.login.description')}</Text>
    </View>
  );
}
