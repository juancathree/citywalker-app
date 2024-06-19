import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from '@testing-library/react-native';

const Stack = createNativeStackNavigator();

export function renderWithNavigation(ui, { routeParams = {}, screenOptions = {} } = {}) {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={ui}
          initialParams={routeParams}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}