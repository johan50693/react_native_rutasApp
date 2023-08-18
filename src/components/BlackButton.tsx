/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BlackButton = ({title, onPress, style}:Props) => {
  return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style= {{
          ...style as any,
          ...styles.blackButton,
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    blackButton: {
      height: 50,
      width: 200,
      backgroundColor:'black',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      elevation: 6,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
});
