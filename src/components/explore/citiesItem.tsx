import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';

import type { City } from '@/types';
import { AnimatedImage, Text } from '@/ui';

type Props = {
  item: City;
  index: number;
};

export function CitiesItem({ item, index }: Props) {
  const router = useRouter();

  const onPress = () => {
    router.push({
      pathname: '/city',
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <View style={styles.container}>
        <AnimatedImage
          uuid={item.uuid}
          index={index}
          className="h-60 rounded"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  container: tailwind`rounded shadow`,
  textContainer: tailwind`justify-center rounded items-center absolute h-full w-full`,
  text: tailwind`text-10 text-white font-bold p-3 rounded bg-black bg-opacity-60`,
};
