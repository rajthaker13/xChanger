import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import Background from '../components/Background';
import StockCard from "../components/home/StockCard";
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../Styles';
import StockBar from '../components/home/StockBar';
import HubScreen from './HubScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import WalletScreen from './WalletScreen';
export default function LoginScreen({navigation}) {
    return (
        <View style={styles.header_large}>
            <Button title="Log In" onPress={() => navigation.navigate('Home')}>Log In</Button>
        </View>
    );
  }