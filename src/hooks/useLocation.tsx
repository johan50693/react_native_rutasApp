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

  const [userLocation, setUserLocation] = useState<Location>({
    longitud: 0,
    latitud: 0,
  });


  useEffect(() => {

    getCurrentLocation()
      .then( location => {
        setInitialPosition(location);
        setUserLocation(location);
        setHasLocation(true);
      });

  }, []);

  const getCurrentLocation = ():Promise<Location> => {
    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitud: coords.latitude,
            longitud: coords.longitude,
          });

        },
        (err) => reject(err),{enableHighAccuracy: true}
        );

    });
  };


  const followUserLocation = () => {

    Geolocation.watchPosition(
      ({coords}) => {
        console.log(coords);
        setUserLocation({
          latitud: coords.latitude,
          longitud: coords.longitude,
        });

      },
      (err) => console.log(err),{enableHighAccuracy: true, distanceFilter: 10}
      );
  };

  return {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
  };
};
