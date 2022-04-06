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
import { DataStore } from '@aws-amplify/datastore';
import {User} from '../src/models';

export default function LoginScreen({navigation}) {
    async function onPress() {
        await DataStore.save(
            new User({
                "username": "Lorem ipsum dolor sit amet",
                "followers": [],
                "following": [],
                "level": 123.45,
                "firstName": "Lorem ipsum dolor sit amet",
                "lastName": "Lorem ipsum dolor sit amet",
                "watchList": "Lorem ipsum dolor sit amet"
            })
        );
        try {
            const posts = await DataStore.query(User);
            console.log("Posts retrieved successfully!", JSON.stringify(posts, null, 2));
          } catch (error) {
            console.log("Error retrieving posts", error);
          }
        navigation.navigate('HomeScreen')

        

    }
    return (
        <View style={styles.header_large}>
            <Button title="Log In" onPress={onPress()}>Log In</Button>
        </View>
    );
  }