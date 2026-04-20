import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import MessageScreen from "../screens/AppScreen/MessageScreen";
import CollectionScreen from "../screens/AppScreen/CollectionScreen";
import JobScreen from "../screens/AppScreen/JobScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Job') {
            iconName = 'briefcase';
          } else if (route.name === 'Collection') {
            iconName = 'albums'; 
          } else if (route.name === 'Message') {
            iconName = 'chatbubble';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Job" component={JobScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;