/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';


export const Map = () => {

  const { hasLocation,
          initialPosition,
          getCurrentLocation,
          followUserLocation,
          userLocation,
          stopFollowUserLocation,
          routeLocation} = useLocation();
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

    const {latitude,longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });

  }, [userLocation]);


  const centerPosition = async () => {

    const {latitude,longitude} = await getCurrentLocation();
    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
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
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={ () => following.current = false}
        >
          <Polyline
            coordinates={routeLocation}
            strokeColor="black"
            strokeWidth={3}
          />
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
