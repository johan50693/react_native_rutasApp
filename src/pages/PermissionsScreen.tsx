/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { PermissionContext } from '../context/PermissionsContext';
import { BlackButton } from '../components/BlackButton';

export const PermissionsScreen = () => {

  const {permissions,askLocationPermission} = useContext(PermissionContext);


  return (
      <View style={styles.container} >
        <Text style={styles.title}> Es necesario el uso del GPS para usar esta app </Text>
        <BlackButton
          title="Permiso"
          onPress={askLocationPermission}
        />

        <Text style={{ marginTop: 20}}>
          {JSON.stringify(permissions,null,2)}
        </Text>
      </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      width: 250,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
});
