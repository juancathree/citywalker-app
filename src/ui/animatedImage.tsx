import React from 'react';
import type { ImageProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { Image } from './image';

type Props = {
  uuid: string;
  index: number;
} & ImageProps;

export function AnimatedImage({ uuid, index, ...rest }: Props) {
  return (
    <Animated.View key={index} sharedTransitionTag={uuid} {...rest}>
      <Image uuid={uuid} />
    </Animated.View>
  );
}
