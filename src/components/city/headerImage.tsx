import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import tailwind from 'twrnc';

type Props = {
  uuid: string;
  y: number;
};

const { height: wHeight } = Dimensions.get('window');

export const HEADER_IMAGE_HEIGHT = wHeight / 3;

export default function HeaderImage({ uuid, y }: Props) {
  const height = interpolate(
    y,
    [-100, 0],
    [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    'clamp'
  );
  // Add the missing argument);

  const top = interpolate(y, [0, 100], [0, -100], 'clamp');

  return (
    <Animated.Image
      source={{
        uri: `https://ik.imagekit.io/aacivfepey/${uuid}.jpg`,
      }}
      style={[tailwind`absolute top-0 left-0 w-full h-100`, { top, height }]}
      resizeMode={'cover'}
      sharedTransitionTag={uuid as string}
    />
  );
}
