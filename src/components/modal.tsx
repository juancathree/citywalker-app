import type { PropsWithChildren } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Incubator } from 'react-native-ui-lib';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core';
import { View } from '@/ui';

type Props = PropsWithChildren<{
  isVisible: boolean;
  hideModal: () => void;
}>;

export function Modal({ children, isVisible, hideModal }: Props) {
  const { t } = useTranslation();
  const theme = useThemeConfig();

  const headerProps: Incubator.DialogHeaderProps = {
    title: t('components.forgotPassword.title')!,
    titleStyle: tailwind`text-5 font-bold self-start text-[${theme.colors.text}]`,
    subtitle: t('components.forgotPassword.subtitle')!,
    subtitleStyle: tailwind`self-start text-[${theme.colors.text}]`,
    contentContainerStyle: tailwind`pt-3`,
    style: tailwind`bg-[${theme.colors.background}]`,
    showKnob: false,
    showDivider: true,
  };

  return (
    <Incubator.Dialog
      centerV
      centerH
      bottom
      containerStyle={tailwind`w-70`}
      modalProps={{
        useKeyboardAvoidingView: false,
      }}
      useSafeArea={false}
      headerProps={headerProps}
      visible={isVisible}
      onDismiss={hideModal}
    >
      <View className="p-5">{children}</View>
    </Incubator.Dialog>
  );
}
