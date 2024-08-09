import { FlashList } from '@shopify/flash-list';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import tailwind from 'twrnc';

import Blur from '@/components/blur';
import { useThemeConfig } from '@/core/use-theme-config';
import type { City } from '@/types/city';
import { View } from '@/ui';
import Card from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Link } from '@/ui/link';
import Text from '@/ui/text';

// eslint-disable-next-line max-lines-per-function
export default function City() {
  const { item } = useLocalSearchParams();
  const parsedData: City = JSON.parse(item as string);
  const [headerTitle, setHeaderTitle] = React.useState('');
  const theme = useThemeConfig();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Change the title based on the scroll position
    if (scrollY > 500) {
      setHeaderTitle('Places');
    } else {
      setHeaderTitle('');
    }
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [-600, 0, 600], [0, 1, 0]),
    };
  });

  const infoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [-600, 0, 600], [0, 1, 0]),
    };
  });

  const padding = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(scrollOffset.value, [100, 0], [40, 0], 'clamp'),
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 500], [0, 1]),
    };
  });

  const openURL = async (url: string) => {
    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL with the user's default browser
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View style={tailwind`flex-1`}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: headerTitle,
          headerTitleAlign: 'center',
          headerShadowVisible: true,
          headerLeft: () => (
            <TouchableOpacity
              style={tailwind`p-1 bg-[${theme.colors.card}] rounded shadow`}
              onPress={() => router.back()}
            >
              <Icon name="back" style={tailwind`ml-2`} />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <Animated.View style={[tailwind`h-100`, headerAnimatedStyle]}>
              <Blur />
            </Animated.View>
          ),
          headerRight: () => (
            <Card
              style={tailwind`p-2 rounded border border-[${theme.colors.primary}]`}
            >
              <Link
                text="Create travel"
                action={() => {
                  router.replace({
                    pathname: '/createTravel',
                    params: {
                      city: JSON.stringify(parsedData),
                    },
                  });
                }}
              />
            </Card>
          ),
        }}
      />
      <Animated.ScrollView
        style={[tailwind`flex-1`, padding]}
        stickyHeaderIndices={[2]}
        scrollEventThrottle={16}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <Animated.Image
          source={{
            uri: `https://ik.imagekit.io/aacivfepey/${parsedData.uuid}.jpg`,
          }}
          style={[
            tailwind`absolute rounded-b-lg top-0 left-0 w-full h-100`,
            imageAnimatedStyle,
          ]}
          resizeMode={'cover'}
          sharedTransitionTag={parsedData.uuid}
        />
        <Animated.View style={[tailwind`mt-100`, infoAnimatedStyle]}>
          <View style={tailwind`flex-row items-center`}>
            <Text style={tailwind`p-3 text-8 font-bold`}>
              {parsedData?.city}
            </Text>
            <CountryFlag
              isoCode={parsedData?.countryCode as string}
              size={25}
            />
          </View>

          <View style={tailwind` flex-row gap-3 p-3 flex-wrap`}>
            <Card
              style={tailwind`items-center justify-center p-3 flex-row gap-2 rounded grow`}
            >
              <Text style={tailwind`font-bold`}>Continent :</Text>
              <Text>{parsedData?.continent}</Text>
            </Card>
            <Card
              style={tailwind`items-center justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Text style={tailwind`font-bold`}>Country :</Text>
              <Text>{parsedData?.country}</Text>
            </Card>
            <Card
              style={tailwind`items-center justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Text style={tailwind`font-bold`}>Adapter :</Text>
              <Text>{parsedData?.adapterPlug}</Text>
            </Card>
            <Card
              style={tailwind`items-center justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Text style={tailwind`font-bold`}>Currency :</Text>
              <Text>{parsedData?.currency}</Text>
            </Card>
            <Card
              style={tailwind`items-center justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Text style={tailwind`font-bold`}>Language :</Text>
              <Text>{parsedData?.lngSpoken}</Text>
            </Card>
            <Card
              style={tailwind`items-center w-full justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Link
                text="Check if you need a visa"
                action={() => openURL(parsedData?.visa as string)}
              />
            </Card>
          </View>
        </Animated.View>
        <View style={tailwind`h-4`} />
        <View style={tailwind`p-3 pb-20`}>
          <FlashList
            data={parsedData.places}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={60}
            ItemSeparatorComponent={() => <View style={tailwind`h-4`} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/place',
                    params: { place: JSON.stringify(item) },
                  })
                }
              >
                <Card style={tailwind`self-center w-[90%] rounded shadow`}>
                  <Animated.Image
                    style={tailwind`w-full h-40 rounded-t`}
                    source={{
                      uri: `https://ik.imagekit.io/aacivfepey/${item.uuid}.jpg`,
                    }}
                    sharedTransitionTag={item.uuid}
                  />
                  <Card style={tailwind`p-3 gap-2 rounded`}>
                    <Text style={tailwind`font-bold text-5`}>{item.name}</Text>
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
      </Animated.ScrollView>
    </View>
  );
}
