import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import tailwind from 'twrnc';

import { CityInformation, CityPlaces, CityStackOptions } from '@/components';
import type { City } from '@/types';
import { AnimatedImage, ListSeparator, View } from '@/ui';

export default function City() {
  const { item } = useLocalSearchParams();
  const city: City = JSON.parse(item as string);
  const { t } = useTranslation();
  const [headerTitle, setHeaderTitle] = React.useState('');
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 500) {
      setHeaderTitle(t('screens.city.headerTitle') as string);
    } else {
      setHeaderTitle('');
    }
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [-600, 0, 600], [0, 1, 0]),
    };
  });

  const paddingAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(scrollOffset.value, [100, 0], [40, 0], 'clamp'),
    };
  });

  return (
    <View style={styles.container}>
      <CityStackOptions
        scrollOffset={scrollOffset}
        headerTitle={headerTitle}
        city={city}
      />
      <Animated.ScrollView
        style={[styles.container, paddingAnimatedStyle]}
        stickyHeaderIndices={[2]}
        scrollEventThrottle={16}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <AnimatedImage
          uuid={city.uuid}
          index={0}
          style={[styles.image, imageAnimatedStyle]}
        />
        <CityInformation scrollOffset={scrollOffset} city={city} />
        <ListSeparator />
        <CityPlaces city={city} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = {
  container: tailwind`flex-1`,
  image: tailwind`absolute rounded-b-lg top-0 left-0 w-full h-100`,
};
