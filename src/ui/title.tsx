import { t } from 'i18next';
import React from 'react';

import { useSelectedTheme } from '@/core';

import { Image } from './image';
import Text from './text';

export default function Title() {
  const { selectedTheme } = useSelectedTheme();
  const image =
    selectedTheme === 'dark'
      ? require('assets/images/citywalkerDark.png')
      : require('assets/images/citywalkerLight.png');

  return (
    <>
      <Image
        source={image}
        className="h-20 w-80"
        contentFit="cover"
        transition={1000}
      />
      <Text testID="subtitle" className="mb-10">
        {t('screens.login.description')}
      </Text>
    </>
  );
}
