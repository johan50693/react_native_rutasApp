/* eslint-disable prettier/prettier */
import React from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';


export const Map = () => {

  const {hasLocation,initialPosition} = useLocation();

  if ( !hasLocation){
    return <LoadingScreen />;
  }

  return (
      <>
        <MapView
          style= {{flex: 1}}
          showsUserLocation= {true}
          initialRegion={{
            latitude: initialPosition.latitud,
            longitude: initialPosition.longitud,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
      </>
  );
};
