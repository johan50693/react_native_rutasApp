/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MapsScreen } from '../pages/MapsScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle:{
          backgroundColor: 'red',
        },
      }}
    >
      <Stack.Screen name="PermissionScreen" component={PermissionsScreen} />
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
    </Stack.Navigator>
  );
};
