/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';


export const Map = () => {

  const {hasLocation,initialPosition,getCurrentLocation,followUserLocation, userLocation,stopFollowUserLocation} = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      // TODO: Cancelar seguimiento
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {

    if (!following.current) {return;}

    const {latitud,longitud} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitud,
        longitude: longitud,
      },
    });

  }, [userLocation]);


  const centerPosition = async () => {

    const {latitud,longitud} = await getCurrentLocation();
    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitud,
        longitude: longitud,
      },
    });
  };

  if ( !hasLocation){
    return <LoadingScreen />;
  }

  return (
      <>
        <MapView
        ref={ (el) => mapViewRef.current = el!}
          style= {{flex: 1}}
          showsUserLocation= {true}
          initialRegion={{
            latitude: initialPosition.latitud,
            longitude: initialPosition.longitud,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={ () => following.current = false}
        >
          {/* <Marker
            image= {require('../assets/custom-marker.png')}
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title={'Titulo del marcador'}
            description={'descripcion del marcador'}
          /> */}

        </MapView>

        <Fab
          iconName="compass-outline"
          onPress={centerPosition}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}
        />
      </>
  );
};
