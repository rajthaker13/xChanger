import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../Styles';
import {View} from 'react-native';
export default function Background() {
    return (
      <LinearGradient 
      colors={['#18FE04', 'black']} 
      start={{
        x: 0,
        y: 0
      }}
      end={{
        x: 1,
        y: 1
      }} 
      style={styles.background} />
    );
  }