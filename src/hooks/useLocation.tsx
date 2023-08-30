/* eslint-disable prettier/prettier */
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitud: 0,
    longitud: 0,
  });


  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          latitud: coords.latitude,
          longitud: coords.longitude,
        });
        setHasLocation(true);
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
      }
      );
  }, []);

  return {
    hasLocation,
    initialPosition,
  };
};
