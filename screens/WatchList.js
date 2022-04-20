import React, {useEffect, useState} from 'react';
import { Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import '../global';
import {styles} from '../Styles'
import TournamentProfilePic from '../components/tournamentInfo/TournamentProfilePic';
import TournamentInfoHeader from '../components/tournamentInfo/TournamentInfoHeader';
import TournamentLeaderboard from '../components/tournamentInfo/TournamentLeaderboard';
import TourneyHeaderSlide from '../components/watchList/TourneyHeaderSlide';
import TourneyStockSlide from '../components/watchList/TourneyStockSlide';
import StockSlide from '../components/watchList/StockSlide';

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
            {listMode == 'All' &&
               <View style={{marginTop: 30}}>
                 <StockSlide stockName='AAPL' fullName='Apple' />
                 <StockSlide stockName='TSLA' fullName='Tesla' />
                 <StockSlide stockName='NFLX' fullName='Netflix' />
                 <StockSlide stockName='AMZN' fullName='Amazon' />
                 <StockSlide stockName='TWTR' fullName='Twitter' />
                 <StockSlide stockName='RTX' fullName='Raytheon' />
                 <StockSlide stockName='FL' fullName='Foot Locker'/>
                 <StockSlide stockName='F' fullName='Ford Motor'/>
                 <StockSlide stockName='XOM' fullName='Exxon Mobil'/>
               </View> 
            }
          {listMode == 'Tourney' &&
               <View style={{marginTop: 30}}>
                 <TourneyHeaderSlide img={require('../assets/images/jpMorgan.png')} name='J.P. Morgan Challenge' rank={235} maxUsers={1000}/>
                 <TourneyStockSlide stockName='AAPL' fullName='Apple' invested={20} totalInvested={100} />
                 <TourneyStockSlide stockName='TSLA' fullName='Tesla' invested={50} totalInvested={100}/>
                 <TourneyStockSlide stockName='NFLX' fullName='Netflix' invested={30} totalInvested={100}/>
                 <TourneyHeaderSlide img={require('../assets/images/bankOfAmerica.jpeg')} name='BOA Bracket' rank={13} maxUsers={200}/>
                 <TourneyStockSlide stockName='AMZN' fullName='Amazon' invested={3} totalInvested={5} />
                 <TourneyStockSlide stockName='TWTR' fullName='Twitter' invested={2} totalInvested={5}/>
                 <TourneyHeaderSlide img={require('../assets/images/Capital-One-Logo.png')} name='Capital One Cup' rank={3} maxUsers={100}/>
                 <TourneyStockSlide stockName='RTX' fullName='Raytheon' invested={.05} totalInvested={.1} />
                 <TourneyStockSlide stockName='FL' fullName='Foot Locker' invested={.02} totalInvested={.1}/>
                 <TourneyStockSlide stockName='F' fullName='Ford Motor' invested={.02} totalInvested={.1}/>
                 <TourneyStockSlide stockName='XOM' fullName='Exxon Mobil' invested={.01} totalInvested={.1}/>
               </View> 
            }
        </ScrollView>
    );
  }