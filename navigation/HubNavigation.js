import * as React from 'react';
import HubScreen from '../screens/HubScreen';
import TournamentInfo from '../screens/TournamentInfo';
import { createStackNavigator } from '@react-navigation/stack';
import WatchList from '../screens/WatchList';
const Stack = createStackNavigator();
export default function HubNavigation() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="HubScreen">
            <Stack.Screen name="HubScreen" component={HubScreen} />
            <Stack.Screen name="TournamentInfo" component={TournamentInfo} />
            <Stack.Screen name="WatchList" component={WatchList} />
        </Stack.Navigator>
    );
  }