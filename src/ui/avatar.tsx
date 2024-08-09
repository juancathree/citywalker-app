import { funEmoji } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tailwind from 'twrnc';

type Props = {
  fullName: string;
};
export default function Avatar({ fullName }: Props) {
  const avatar = createAvatar(funEmoji, {
    seed: fullName,
    radius: 50,
  }).toString();

  return (
    <View style={tailwind`h-15 w-15`}>
      <SvgXml xml={avatar} />
    </View>
  );
}
