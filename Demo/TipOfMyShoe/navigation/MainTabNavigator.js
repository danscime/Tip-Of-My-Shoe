import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import IdentifyScreen from '../screens/IdentifyScreen';
import SavedScreen from '../screens/SavedScreen';
import ResultScreen from '../screens/ResultScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const IdentifyStack = createStackNavigator(
  {
    Identify: IdentifyScreen,
    Result: ResultScreen,
  },
  config
);

IdentifyStack.navigationOptions = {
  tabBarLabel: 'Identify',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-camera`
          : 'md-camera'
      }
    />
  ),
};

IdentifyStack.path = '';

const SavedStack = createStackNavigator(
  {
    Saved: SavedScreen,
  },
  config
);

SavedStack.navigationOptions = {
  tabBarLabel: 'Saved',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'} />
  ),
};

SavedStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  IdentifyStack,
  SavedStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
