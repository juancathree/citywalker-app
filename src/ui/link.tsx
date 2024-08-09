import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  text: string;
  action: () => void;
  [key: string]: any; // Allow additional props
};

export function Link({ text, action, ...rest }: Props) {
  return (
    <TouchableOpacity onPress={action} {...rest}>
      <Text className="font-bold text-primary">{text}</Text>
    </TouchableOpacity>
  );
}
