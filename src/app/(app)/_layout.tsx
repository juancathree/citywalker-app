import { Redirect, SplashScreen, Tabs, useSegments } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { Blur } from '@/components';
import { useAuth } from '@/core';
import { Icon } from '@/ui';

export default function TabLayout() {
  const { status } = useAuth();
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

  const tabBackground = () => <Blur />;

  const icon = (name: string, focused: boolean) => {
    return <Icon testID={`${name}Tab`} name={name} isFocused={focused} />;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          display: segment.length > 2 ? 'none' : 'flex',
        },
        tabBarBackground: tabBackground,
      }}
    >
      <Tabs.Screen
        name="(explore)"
        options={{
          title: 'Explore',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => icon('explore', focused),
        }}
      />

      <Tabs.Screen
        name="(travels)"
        options={{
          title: 'Travels',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => icon('travels', focused),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => icon('account', focused),
        }}
      />
    </Tabs>
  );
}
