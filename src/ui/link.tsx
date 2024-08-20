import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  text: string;
  action: () => void;
} & TouchableOpacityProps;

export function Link({ text, action, ...rest }: Props) {
  return (
    <TouchableOpacity onPress={action} {...rest}>
      <Text className="font-bold text-primary">{text}</Text>
    </TouchableOpacity>
  );
}
