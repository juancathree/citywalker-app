import { t } from 'i18next';
import React from 'react';
import { Alert, Linking } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import tailwind from 'twrnc';

import type { City } from '@/types';
import { Card, Link, Text, View } from '@/ui';

type Props = {
  scrollOffset: SharedValue<number>;
  city: City;
};

const keys = ['continent', 'country', 'adapterPlug', 'currency', 'lngSpoken'];

export function CityInformation({ scrollOffset, city }: Props) {
  const infoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [-600, 0, 600], [0, 1, 0]),
    };
  });

  const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Animated.View style={[styles.container, infoAnimatedStyle]}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{city?.city}</Text>
        <CountryFlag isoCode={city?.countryCode as string} size={25} />
      </View>
      <View style={styles.informationContainer}>
        {keys.map((key) => (
          <Card style={styles.chip} key={key}>
            <Text style={styles.key}>
              {t(`components.cityInformation.${key}`)}:
            </Text>
            <Text>{city[key as keyof City] as string}</Text>
          </Card>
        ))}
        <Card style={styles.chipLink}>
          <Link
            text={t('components.cityInformation.visa')}
            action={() => openURL(city?.visa as string)}
          />
        </Card>
      </View>
    </Animated.View>
  );
}

const styles = {
  container: tailwind`mt-100`,
  nameContainer: tailwind`flex-row items-center`,
  nameText: tailwind`p-3 text-8 font-bold`,
  informationContainer: tailwind`flex-row gap-3 p-3 flex-wrap`,
  chip: tailwind`items-center justify-center p-3 flex-row gap-2 rounded grow`,
  chipLink: tailwind`items-center w-full justify-center grow p-3 flex-row gap-2 rounded`,
  key: tailwind`font-bold`,
};
