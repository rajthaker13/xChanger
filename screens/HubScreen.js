import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Background from '../components/Background'
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../Styles';
import HubHeader from '../components/hub/HubHeader';
import Tournaments from '../components/hub/Tournaments';
import Posts from '../components/hub/Posts';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function HubScreen({navigation}) {
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
            <Tournaments navigation={navigation}/>
            <Posts />
        </ScrollView>
      </LinearGradient>
    );
  }