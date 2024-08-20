import { Stack, useRouter } from 'expo-router';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core';
import type { City } from '@/types';
import { Card, Icon, Link } from '@/ui';

import { Blur } from '../blur';

type Props = {
  scrollOffset: SharedValue<number>;
  headerTitle: string;
  city: City;
};

export function CityStackOptions({ scrollOffset, headerTitle, city }: Props) {
  const router = useRouter();
  const theme = useThemeConfig();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 500], [0, 1]),
    };
  });

  const headerLeft = () => (
    <TouchableOpacity
      style={tailwind`p-1 bg-[${theme.colors.card}] rounded shadow`}
      onPress={() => router.back()}
    >
      <Icon name="back" style={tailwind`ml-2`} />
    </TouchableOpacity>
  );

  const headerBackground = () => (
    <Animated.View style={[tailwind`h-100`, headerAnimatedStyle]}>
      <Blur />
    </Animated.View>
  );

  const headerRight = () => (
    <Card style={tailwind`p-2 rounded border border-[${theme.colors.primary}]`}>
      <Link
        text={t('screens.city.createTravel')}
        action={() => {
          router.replace({
            pathname: '/createTravel',
            params: {
              city: JSON.stringify(city),
            },
          });
        }}
      />
    </Card>
  );

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: headerTitle,
        headerTitleAlign: 'center',
        headerShadowVisible: true,
        headerLeft: headerLeft,
        headerBackground: headerBackground,
        headerRight: headerRight,
      }}
    />
  );
}
