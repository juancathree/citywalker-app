import React from 'react';
import { TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';
import { Image } from '@/ui';

export function SocialNetworks() {
  // const { continueWithGoogle } = useAuth();
  const theme = useThemeConfig();
  const image = theme.dark
    ? require('assets/images/googleDark.png')
    : require('assets/images/googleLight.png');

  return (
    <TouchableOpacity onPress={() => { }}>
      <Image
        source={image}
        style={tailwind`rounded w-45 h-10 self-center border-[${theme.colors.placeholder}] border`}
      />
    </TouchableOpacity>
  );
}
