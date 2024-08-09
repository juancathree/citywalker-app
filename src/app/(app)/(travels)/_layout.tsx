import { Stack } from 'expo-router';
import React from 'react';

export default function TravelsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index" />
  );
}
