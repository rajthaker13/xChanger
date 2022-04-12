import React, {useEffect} from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import '../global';
import {styles} from '../Styles'
import TournamentProfilePic from '../components/tournamentInfo/TournamentProfilePic';
import TournamentInfoHeader from '../components/tournamentInfo/TournamentInfoHeader';
import TournamentLeaderboard from '../components/tournamentInfo/TournamentLeaderboard';
export default function TournamentInfo({route, navigation}) {
    const {name, buyIn, pot, numUsers, maxUsers, img} = route.params
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
          <View style={{alignItems:'center', flex:1}}>
            <TournamentProfilePic img={img}/>
            <TournamentInfoHeader name={name} buyIn={buyIn} pot={pot} numUsers = {numUsers} maxUsers={maxUsers} />
            <TournamentLeaderboard numUsers={numUsers} maxUsers={maxUsers} />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }