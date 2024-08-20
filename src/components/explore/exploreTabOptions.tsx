import { Tabs } from 'expo-router';
import React from 'react';
import Animated from 'react-native-reanimated';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import tailwind from 'twrnc';

import { Blur } from '../blur';

type Props = {
  scrollOffset: Animated.SharedValue<number>;
  headerTitle: string;
  show: boolean;
};

export function ExploreTabOptions({ scrollOffset, headerTitle, show }: Props) {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 25], [0, 1]),
    };
  });

  return (
    <Tabs.Screen
      options={{
        headerTitle: headerTitle,
        headerShown: show,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerBackground: () => (
          <Animated.View style={[tailwind`h-100`, headerAnimatedStyle]}>
            <Blur />
          </Animated.View>
        ),
      }}
    />
  );
}
