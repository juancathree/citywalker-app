import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import { CitiesList, ExploreTabOptions, SearchBar } from '@/components';
import { Text } from '@/ui';

export default function Explore() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { t } = useTranslation();
  const [headerTitle, setHeaderTitle] = React.useState('');
  const [show, setShow] = React.useState(false);
  const scrollOffset = useScrollViewOffset(scrollRef);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 25) {
      setHeaderTitle(t('screens.explore.headerTitle') as string);
      setShow(true);
    } else {
      setShow(false);
      setHeaderTitle('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExploreTabOptions
        scrollOffset={scrollOffset}
        headerTitle={headerTitle}
        show={show}
      />
      <Animated.ScrollView
        style={styles.scroll}
        stickyHeaderIndices={[2]}
        scrollEventThrottle={16}
        ref={scrollRef}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {t('screens.explore.headerTitle')}
          </Text>
          <SearchBar />
        </View>
        <CitiesList />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: tailwind`flex-1 p-5`,
  scroll: tailwind`flex-1`,
  headerContainer: tailwind`flex-row justify-between gap-10 mb-5`,
  headerText: tailwind`text-10 font-bold`,
};
