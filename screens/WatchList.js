import React, {useEffect, useState} from 'react';
import { Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import '../global';
import {styles} from '../Styles'
import TournamentProfilePic from '../components/tournamentInfo/TournamentProfilePic';
import TournamentInfoHeader from '../components/tournamentInfo/TournamentInfoHeader';
import TournamentLeaderboard from '../components/tournamentInfo/TournamentLeaderboard';

const testStocks = ['apple', 'tesla', 'netflix', 'amazon', 'facebook', 'target', 'starbucks', 'chipotle', 'mcdonalds', 'yahoo', 'nba']
export default function WatchList({route, navigation}) {
    const [listMode, setListMode] = useState('All')
    const [pictureList, setPictureList] = useState([])
    useEffect(() => {

    }, [])
    return (
        <ScrollView style={{backgroundColor:'#0A0909'}}>
          <Text style={styles.tournamentInfoHeaderName}>Watch List</Text>
          <View style={{flexDirection:'row', justifyContent:'center', marginTop: 15}}>
            <TouchableOpacity onPress={() => setListMode('All')}>
              <View style={listMode == 'All' ? styles.watchListChoiceContainerSelected: styles.watchListChoiceContainerUnselected}>
                <Text style={listMode == 'All' ? styles.watchListChoiceTextSelected: styles.watchListChoiceTextUnselected}>All Stocks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setListMode('Tourney')}>
              <View style={listMode == 'Tourney' ? styles.watchListChoiceContainerSelected: styles.watchListChoiceContainerUnselected}>
                <Text style={listMode == 'Tourney' ? styles.watchListChoiceTextSelected: styles.watchListChoiceTextUnselected}>Tourney Lineups</Text>
              </View>
            </TouchableOpacity>
            </View>
            {listMode == 'Tourney' &&
               <View style={{marginTop: 30}}>
                 <View style={styles.watchListTourneyHeader}>
                   <View style={styles.watchListTourneyProfileContainer}>
                     <Image source={require('../assets/images/jpMorgan.png')} style={styles.profilePicImage} resizeMode='contain'/>
                   </View>
                   <Text style={styles.watchListTourneyName}>J.P. Morgan Challenge</Text>
                   <Text style={styles.watchListTourneyRank}>Rank: 235/1000</Text>
                 </View>
                 <View style={styles.watchListTourneyStockSlide}>
                 <View style={styles.watchListTourneyProfileContainer}>
                     <Image source={require('../assets/images/jpMorgan.png')} style={styles.profilePicImage} resizeMode='contain'/>
                   </View>
                   <View>
                     
                   </View>
                   <Text style={styles.watchListStockName}>Apple:</Text>
                   <Text style={styles.watchListStockInfo}>Invested: 20k/100k</Text>
                   <TouchableOpacity style={styles.watchListEditButton}>

                   </TouchableOpacity>
                 </View>
               </View>
            
            }
        </ScrollView>
    );
  }