/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { MapsScreen } from '../pages/MapsScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {

  const {permissions} = useContext(PermissionContext);

  if (permissions.locationStatus == 'unavailable') {
      return <LoadingScreen/>;

  }
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
      {
        (permissions.locationStatus === 'granted')
          ? <Stack.Screen name="MapsScreen" component={MapsScreen} />
          : <Stack.Screen name="PermissionScreen" component={PermissionsScreen} />
      }

    </Stack.Navigator>
  );
};
