import { Redirect, SplashScreen, Tabs, useSegments } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import Blur from '@/components/blur';
import { useAuth } from '@/core';
import { useThemeConfig } from '@/core/use-theme-config';
import { Icon } from '@/ui/icon';

export default function TabLayout() {
  const status = useAuth.use.status();
  const theme = useThemeConfig();
  const segment = useSegments();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          display: segment.length > 2 ? 'none' : 'flex',
        },
        tabBarBackground: () => <Blur />,
      }}
    // tabBar={(props) =>
    //   segment.length > 2 ? null : <BottomTabBar {...props} />
    // }
    >
      <Tabs.Screen
        name="(explore)"
        options={{
          title: 'Explore',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="Explore" isFocused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(travels)"
        options={{
          title: 'Travels',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="Travels" isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="Account" isFocused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
