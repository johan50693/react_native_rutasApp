/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


export const Map = () => {

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => console.log(info),
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
      }
      );
    console.log('useEffect');
  }, []);

  return (
      <>
        <MapView
          style= {{flex: 1}}
          showsUserLocation= {true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
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
