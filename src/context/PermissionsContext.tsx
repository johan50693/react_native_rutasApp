/* eslint-disable prettier/prettier */
import {createContext, useState} from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
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

  const askLocationPermission = async () => {
    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios'){
      // permisionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else {
      // permisionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permisionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    }
    setPermissions({
      ...permissions,
      locationStatus: permisionStatus,
    });
  };

  const checkLocationPermission = () => {

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
