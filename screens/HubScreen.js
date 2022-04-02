import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Background from '../components/Background'
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../Styles';
import HubHeader from '../components/hub/HubHeader';
import Tournaments from '../components/hub/Tournaments';
import Posts from '../components/hub/Posts';
export default function HubScreen() {
    return (
      <LinearGradient 
        colors={['#18FE04', '#121111']} 
        start={{
        x: 0,
        y: 0
        }}
        end={{
        x: 1,
        y: 1
        }} 
        style={styles.background}>
        <ScrollView>
            <HubHeader />
            <Tournaments />
            <Posts />
        </ScrollView>
      </LinearGradient>
    );
  }