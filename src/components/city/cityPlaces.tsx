import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core';
import type { City } from '@/types';
import { AnimatedImage, Card, ListSeparator, Text, View } from '@/ui';

type Props = {
  city: City;
};

export function CityPlaces({ city }: Props) {
  const router = useRouter();
  const theme = useThemeConfig();

  return (
    <View style={styles.container}>
      <FlashList
        data={city.places}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={60}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/place',
                params: { place: JSON.stringify(item) },
              })
            }
          >
            <Card style={styles.placeContainer}>
              <AnimatedImage
                style={styles.image}
                uuid={item.uuid}
                index={index}
              />
              <Card style={styles.informationContainer}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text style={tailwind`text-[${theme.colors.placeholder}]`}>
                  {item.category}
                </Text>
              </Card>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = {
  container: tailwind`p-3 pb-20`,
  placeContainer: tailwind`self-center w-[90%] rounded shadow`,
  image: tailwind`w-full h-40 rounded-t`,
  informationContainer: tailwind`p-3 gap-2 rounded`,
  placeName: tailwind`font-bold text-5`,
};
