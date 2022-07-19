import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Background from '../components/Background';
import StockCard from "../components/home/StockCard";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../Styles';
import StockBar from '../components/home/StockBar';
import HubScreen from './HubScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import WalletScreen from './WalletScreen';
export default function HomeScreen() {
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
      }} xxe
      style={styles.background}>
      <StockBar></StockBar>
      <StockCard></StockCard>
    </LinearGradient>
  );
}