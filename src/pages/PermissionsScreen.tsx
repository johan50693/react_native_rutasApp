/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export const PermissionsScreen = () => {

  const checkLocationPermission = async () => {

    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios'){
      // permisionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else {
      // permisionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permisionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    }

    console.log(permisionStatus);

  };

  return (
      <View style={styles.container} >
        <Text> PermissionsScreen </Text>
        <Button
          title="Permiso"
          onPress={checkLocationPermission}
        />
      </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
