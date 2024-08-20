import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import tailwind from 'twrnc';

import Blur from '@/components/blur';
import { useThemeConfig } from '@/core/useThemeConfig';
import Expenses from '@/components/travels/expenses';
import Itinerary from '@/components/travels/itinerary';
import type { Travel } from '@/types/travel';
import { Icon } from '@/ui/icon';

export default function TravelCity() {
  const { data } = useLocalSearchParams();
  const theme = useThemeConfig();
  const travel: Travel = JSON.parse(data as string);
  const [index, setIndex] = React.useState(0);
  const [day, setDay] = React.useState(0);

  const layout = useWindowDimensions();

  const [routes] = React.useState([
    { key: 'itinerary', title: 'Itinerary' },
    { key: 'expenses', title: 'Expenses' },
  ]);

  return (
    <View style={tailwind`flex-1 mb-5`}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `${travel.city}`,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerBackground: () => <Blur />,
          headerLeft: () => (
            <TouchableOpacity
              style={tailwind`p-1 bg-[${theme.colors.card}] rounded shadow`}
              onPress={() => router.back()}
            >
              <Icon name="back" style={tailwind`ml-2`} />
            </TouchableOpacity>
          ),
        }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          itinerary: () => <Itinerary travel={travel} />,
          expenses: () => <Expenses travel={travel} />,
        })}
        onIndexChange={setIndex}
        swipeEnabled={false}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={tailwind`bg-[${theme.colors.background}] mx-10`}
            contentContainerStyle={tailwind`justify-around`}
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.placeholder}
            indicatorStyle={tailwind`bg-[${theme.colors.primary}]`}
          />
        )}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
