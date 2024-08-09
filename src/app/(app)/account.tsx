import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Divider } from '@ui-kitten/components';
import React from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

import { useAuth, useSelectedTheme } from '@/core';
import { getUser } from '@/core/auth/utils';
import { useThemeConfig } from '@/core/use-theme-config';
import Avatar from '@/ui/avatar';
import Card from '@/ui/card';
import { Icon } from '@/ui/icon';
import Text from '@/ui/text';

export default function Account() {
  const theme = useThemeConfig();
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const user = getUser();
  const signOut = useAuth.use.signOut();
  const [activeChecked, setActiveChecked] = React.useState(
    selectedTheme === 'dark'
  );

  const onActiveCheckedChange = (isChecked: boolean): void => {
    setSelectedTheme(isChecked ? 'dark' : 'light');
    setActiveChecked(isChecked);
  };

  return (
    <SafeAreaView style={tailwind`flex-1 px-5 py-3 pb-15`}>
      <Text style={tailwind`text-10 font-bold`}>Account</Text>
      <View style={tailwind`flex-1 items-center gap-5 mt-10`}>
        <Card style={tailwind`flex-row gap-5 rounded p-3 w-full`}>
          <Avatar fullName={user.fullName!} />
          <Card style={tailwind`justify-center`}>
            <Text style={tailwind`text-5 font-bold`}>{user.fullName}</Text>
            <Text style={tailwind`text-[${theme.colors.placeholder}]`}>
              {user.email}
            </Text>
          </Card>
        </Card>
        <Card style={tailwind`rounded gap-3 p-3 w-full`}>
          <Card style={tailwind`flex-row items-center gap-3`}>
            <Text style={tailwind`font-bold text-5`}>Settings</Text>
          </Card>
          <Divider
            style={tailwind`opacity-20 bg-[${theme.colors.placeholder}]`}
          />
          <Card style={tailwind`flex-row items-center gap-3`}>
            <Icon name="darkMode" />
            <Text style={tailwind``}>Dark theme</Text>
            <Switch
              value={activeChecked}
              onValueChange={onActiveCheckedChange}
              style={tailwind`ml-auto`}
              trackColor={{ true: theme.colors.primary }}
              thumbColor={theme.colors.primary}
            />
          </Card>
        </Card>
        <Card style={tailwind`flex-row items-center rounded gap-3 p-3 w-full`}>
          <Icon name="info" />
          <Text>Information</Text>
          <TouchableOpacity style={tailwind`ml-auto`} onPress={() => { }}>
            <Icon name="forward" />
          </TouchableOpacity>
        </Card>
        <View style={tailwind`flex-1 justify-end`}>
          <TouchableOpacity onPress={signOut}>
            <Card style={tailwind`p-3 rounded shadow`}>
              <Card style={tailwind`flex-row items-center gap-3`}>
                <Icon name="logout" fill={theme.colors.error} />
                <Text style={tailwind`text-[${theme.colors.error}]`}>
                  SignOut
                </Text>
              </Card>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
