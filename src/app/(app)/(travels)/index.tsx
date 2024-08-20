import { format } from '@formkit/tempo';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { router, Tabs } from 'expo-router';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-ui-lib';
import tailwind from 'twrnc';

import Blur from '@/components/blur';
import { getCityUUID } from '@/core/store/cities';
import { getTravels } from '@/core/store/travels';
import { useThemeConfig } from '@/core/useThemeConfig';
import Text from '@/ui/text';

// eslint-disable-next-line max-lines-per-function
export default function Travels() {
  const travels = getTravels();
  const theme = useThemeConfig();

  const [headerTitle, setHeaderTitle] = React.useState('');
  const [show, setShow] = React.useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Change the title based on the scroll position
    if (scrollY > 25) {
      setHeaderTitle('Explore');
      setShow(true);
    } else {
      setShow(false);
      setHeaderTitle('');
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 25], [0, 1]),
    };
  });

  return (
    <SafeAreaView style={tailwind`flex-1 p-5`}>
      <Tabs.Screen
        options={{
          headerTitle: headerTitle,
          headerShown: show,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackground: () => (
            <Animated.View style={[tailwind`h-100`, headerAnimatedStyle]}>
              <Blur />
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        contentContainerStyle={tailwind`gap-10`}
      >
        <Text style={tailwind`text-10 font-bold`}>Travels</Text>
        <FlashList
          showsVerticalScrollIndicator={false}
          estimatedItemSize={10}
          data={Array.from(travels.values())}
          contentContainerStyle={tailwind`pb-20`}
          ItemSeparatorComponent={() => <View style={tailwind`h-4`} />}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: '/travel',
                    params: { data: JSON.stringify(item) },
                  })
                }
              >
                <Card style={tailwind`rounded shadow`}>
                  <Animated.Image
                    key={index}
                    source={{
                      uri: `https://ik.imagekit.io/aacivfepey/${getCityUUID(
                        item.city
                      )}.jpg`,
                    }}
                    resizeMode={'cover'}
                    style={tailwind`h-40 rounded self-start w-full`}
                    sharedTransitionTag={getCityUUID(item.city)}
                  />
                  <View style={tailwind`absolute h-full w-full`}>
                    <BlurView
                      intensity={60}
                      tint={
                        theme.dark
                          ? 'systemThinMaterialDark'
                          : 'systemThinMaterialLight'
                      }
                      style={tailwind`h-full p-5 justify-center items-center`}
                    >
                      <Text style={tailwind`text-10 font-bold`}>
                        {item.city}
                      </Text>
                      <Text style={tailwind`font-bold`}>
                        {format(item.schedule.initialDate, 'MMM D')}-
                        {format(item.schedule.endDate, 'MMM D')}
                      </Text>
                    </BlurView>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
