import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core';
import { Image } from '@/ui';

type Props = {} & TouchableOpacityProps;

export function SocialNetworks({ ...rest }: Props) {
  // const { continueWithGoogle } = useAuth();
  const theme = useThemeConfig();
  const image = theme.dark
    ? require('assets/images/googleDark.png')
    : require('assets/images/googleLight.png');

  return (
    //TODO: Add functionality to continue with Google
    <TouchableOpacity {...rest}>
      <Image
        source={image}
        style={tailwind`rounded w-45 h-10 self-center border-[${theme.colors.placeholder}] border`}
      />
    </TouchableOpacity>
  );
}
