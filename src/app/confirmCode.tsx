import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import { useAskCode } from '@/api/auth/useAskCode';
import OTP from '@/components/form/otp';
import { getUser, setUser } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useThemeConfig } from '@/core/use-theme-config';
import { Background } from '@/ui/background';
import { Icon } from '@/ui/icon';
import Text from '@/ui/text';

export default function ConfirmCode() {
  const user = getUser();
  const { mutate: askCode } = useAskCode();
  const router = useRouter();
  const theme = useThemeConfig();
  useSoftKeyboardEffect();

  useEffect(() => {
    askCode(user, {
      onSuccess: (response) => {
        setUser({ ...user, confirmCode: response.confirmCode });
      },
      onError: (data) => {
        console.log(data);
        console.log('error');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <SafeAreaView style={tailwind`flex-1`}>
        <TouchableOpacity
          style={tailwind`pt-20 absolute pl-10`}
          onPress={() => router.back()}
        >
          <Icon name="close" fill={theme.colors.text} />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <Text testID="confirmCode-text" style={tailwind`text-5`}>
            Insert the code we just send you
          </Text>
          <OTP />
        </View>
      </SafeAreaView>
    </Background>
  );
}
