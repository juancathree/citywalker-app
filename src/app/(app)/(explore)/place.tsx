import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Linking, ScrollView, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import tailwind from 'twrnc';

import { useThemeConfig } from '@/core/use-theme-config';
import type { Place } from '@/types/place';
import { View } from '@/ui';
import Card from '@/ui/card';
import { Icon } from '@/ui/icon';
import { Link } from '@/ui/link';
import Text from '@/ui/text';

// eslint-disable-next-line max-lines-per-function
export default function Place() {
  const { place } = useLocalSearchParams();
  const parsedData: Place = JSON.parse(place as string);
  const theme = useThemeConfig();

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

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <View style={tailwind`flex-1`}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={tailwind`bg-[${theme.colors.card}] rounded p-1`}
              onPress={() => router.back()}
            >
              <Icon name="close" />
            </TouchableOpacity>
          ),
          presentation: 'modal',
        }}
      />
      <ScrollView style={tailwind`flex-1`}>
        <Animated.Image
          style={tailwind`w-full h-100 rounded-t`}
          source={{
            uri: `https://ik.imagekit.io/aacivfepey/${parsedData.uuid}.jpg`,
          }}
          sharedTransitionTag={parsedData.uuid}
        />
        <View style={tailwind`p-5 gap-5`}>
          <Text style={tailwind`text-10 font-bold`}>{parsedData.name}</Text>
          <View style={tailwind`flex-row flex-wrap gap-3`}>
            <Card
              style={tailwind`items-center justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Text style={tailwind`font-bold`}>Category :</Text>
              <Text>{parsedData.category}</Text>
            </Card>
            <Card
              style={tailwind`items-center justify-center grow p-3 flex-row rounded`}
            >
              <Text style={tailwind`font-bold`}>Price :</Text>
              <Text style={tailwind`ml-2`}>
                {parsedData.price > 0 ? `${parsedData.price}` : 'Free'}
              </Text>
              <Icon name="dollar" />
            </Card>
            <Card
              style={tailwind`items-center w-full justify-center grow p-3 flex-row gap-2 rounded`}
            >
              <Link
                text="Website"
                action={() => openURL(parsedData?.website as string)}
              />
            </Card>
          </View>
          <Text>{parsedData.information}</Text>
          <Card style={tailwind`gap-2 p-3 rounded`}>
            <Text style={tailwind`text-5 font-bold`}>Schedule</Text>
            {parsedData.visit.schedule.map((item, index) => (
              <Card style={tailwind`flex-row ml-5`} key={index}>
                <Text style={tailwind`font-bold`}>{days[index]}: </Text>
                <Text>{item.join(' - ')}</Text>
              </Card>
            ))}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
