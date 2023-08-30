/* eslint-disable prettier/prettier */
import {createContext, useEffect, useState} from 'react';
import { AppState, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {

  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {

    checkLocationPermission();

  AppState.addEventListener('change', state => {

    if (state !== 'active') {return;}

    checkLocationPermission();
  });
  }, []);

  const askLocationPermission = async () => {
    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios'){
      permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else {
      permisionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    }

    if ( permisionStatus === 'blocked'){
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permisionStatus,
    });
  };

  const checkLocationPermission = async () => {
    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios'){
      permisionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else {
      permisionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    }
    setPermissions({
      ...permissions,
      locationStatus: permisionStatus,
    });
  };

  return (
    <PermissionContext.Provider value={{
      permissions,
      askLocationPermission,
      checkLocationPermission,
    }}>
      {children}
    </PermissionContext.Provider>
  );
};
