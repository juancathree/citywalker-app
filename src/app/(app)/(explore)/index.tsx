/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { locale } from 'expo-localization';
import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import { useCities } from '@/api/cities/useCities';
import Blur from '@/components/blur';
import { useThemeConfig } from '@/core/use-theme-config';
import type { City } from '@/types/city';
import Card from '@/ui/card';
import { Icon } from '@/ui/icon';
import Text from '@/ui/text';

export default function Explore() {
  const theme = useThemeConfig();
  const [isFocused, setIsFocused] = React.useState(false);
  const searchRef = React.useRef<TextInput>(null);
  const [cityFilter, setCityFilter] = React.useState('');
  const [cities, setCities] = React.useState<City[]>([]);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [headerTitle, setHeaderTitle] = React.useState('');
  const [show, setShow] = React.useState(false);
  const scrollOffset = useScrollViewOffset(scrollRef);

  const { data, isPending, isError } = useCities({
    //@ts-ignore
    variables: { lng: locale.split('-')[0] },
  });

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

  useEffect(() => {
    if (data?.cities) {
      setCities(
        data.cities.filter((city) =>
          city.city.toLowerCase().startsWith(cityFilter.toLowerCase())
        )
      );
    }
  }, [cityFilter, data]);

  useEffect(() => {
    if (searchRef.current && isFocused) {
      searchRef.current.focus();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={tailwind`flex-1 px-5 py-5`}>
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
        style={[tailwind`flex-1`]}
        stickyHeaderIndices={[2]}
        scrollEventThrottle={16}
        ref={scrollRef}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={tailwind`flex-row justify-between gap-10 mb-5`}>
          <Text style={tailwind`text-10 font-bold`}>Explore</Text>
          <TouchableOpacity
            style={tailwind`${isFocused ? `grow` : ``}`}
            onPress={() => setIsFocused(true)}
          >
            <Card
              style={tailwind`flex-row grow justify-between items-center rounded-xl border p-3 shadow-md ${isFocused
                  ? `border-[${theme.colors.primary}]`
                  : `border-transparent`
                }`}
            >
              <Card
                style={tailwind`${isFocused ? `mr-2` : ``
                  } items-center justify-center`}
              >
                <Icon name="search" isFocused={isFocused} />
              </Card>
              <TextInput
                ref={searchRef}
                testID={`search-input`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (cityFilter === '') setIsFocused(false);
                }}
                placeholderTextColor={theme.colors.placeholder}
                style={tailwind`${isFocused ? `grow` : `w-0`} text-[${theme.colors.text
                  }]`}
                placeholder={isFocused ? 'Search' : ''}
                selectionColor={theme.colors.text}
                onChangeText={(value) => setCityFilter(value)}
                value={cityFilter}
              />
              {isFocused && (
                <TouchableOpacity
                  onPress={() => {
                    setIsFocused(false);
                    setCityFilter('');
                  }}
                >
                  <Icon name="close" fill={theme.colors.error} />
                </TouchableOpacity>
              )}
            </Card>
          </TouchableOpacity>
        </View>
        <FlashList
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          data={cities}
          contentContainerStyle={tailwind`pb-20`}
          ItemSeparatorComponent={() => <View style={tailwind`h-4`} />}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: '/city',
                    params: { item: JSON.stringify(item) },
                  })
                }
              >
                <Card style={tailwind`rounded shadow`}>
                  <Animated.Image
                    key={index}
                    source={{
                      uri: `https://ik.imagekit.io/aacivfepey/${item.uuid}.jpg`,
                    }}
                    resizeMode={'cover'}
                    style={tailwind`h-40 rounded self-start w-full`}
                    sharedTransitionTag={item.uuid}
                  />
                  <View
                    style={tailwind`justify-center rounded items-center absolute h-full w-full`}
                  >
                    <BlurView intensity={50} tint="systemThickMaterialDark">
                      <Text
                        style={tailwind`text-10 text-white font-bold p-3  rounded`}
                      >
                        {item.city}
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
