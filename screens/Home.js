import * as React from 'react';
import { Image } from 'react-native';
import HomeScreen from './HomeScreen';
import HubNavigation from '../navigation/HubNavigation'
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import WalletScreen from './WalletScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
export default function Home() {
    return (
        <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                      return <MaterialCommunityIcons
                      name='chart-line-variant'
                      size={size}
                      color={color}
                  />
                    } else if (route.name === 'Search') {
                      return <Ionicons
                      name='search'
                      size={size}
                      color={color}
                  />
                    } else if (route.name === 'Hub') {
                      return <Image
                      source={require('../assets/images/XChanger.png')}
                      style={{ width: 26, height: 26, tintColor: color }}
                  />
                    } else if (route.name === 'Wallet') {
                      return <Ionicons
                      name='wallet'
                      size={size}
                      color={color}
                  />
                    } else if (route.name === 'Profile') {
                      return <AntDesign
                      name='user'
                      size={size}
                      color={color}
                  />
                    }
                  },
                  tabBarActiveTintColor: 'green',
                  tabBarInactiveTintColor: 'white',
                  tabBarStyle:{
                    backgroundColor: '#0A0909',
                    height: 100
                  },
                  headerStyle: {
                    backgroundColor:'black',
                  },
                  headerTitleStyle: {
                    color: 'white',
                    fontSize: 20,
                  }
                })
              }
  
        
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Hub" component={HubNavigation} />
          <Tab.Screen name="Wallet" component={WalletScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
  }