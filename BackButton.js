import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function BackButton({ goBack }) {
    return (
      <TouchableOpacity onPress={goBack} style={styles.container}>
          <Ionicons 
            name='arrow-back'
            style={styles.image}
          
          />
      </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 10 + getStatusBarHeight(),
      left: 4,
    },
    image: {
      width: 24,
      height: 24,
    },
  })