import * as React from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function Tournaments({navigation}) {

    return (
        <View>
            <Text style={styles.tournamentsHeader}>TOURNAMENTS</Text>
            <ScrollView horizontal={true}>
                <TouchableOpacity style={styles.tournamentCards} onPress={() => {
                    navigation.navigate("TournamentInfo", {
                        name: 'J.P. Morgan Challenge',
                        buyIn: 10,
                        pot: 10000,
                        numUsers: 777,
                        maxUsers: 1000,
                        img: require('../../assets/images/jpMorgan.png')
                    }
                    )
                }}>
                    <View style={{backgroundColor: 'white', height: '45%'}}>
                        <Image source={require('../../assets/images/jpMorgan.png')} style={styles.tournamentCardLogo}></Image>
                    </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.tournamentCardName}>J.P. Morgan Challenge</Text>
                            <Text style={styles.tournamentCardInfo}>Buy-In: $10</Text>
                            <Text style={styles.tournamentCardInfo}>Total Pot: $10,000</Text>
                            <View style={{flexDirection:'row', marginTop: height * .005}}>
                                <AntDesign name='user' size={20} color='white'/>
                                <Text style={styles.tournamentCardNumUsers}>777/1000</Text>
                            </View>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tournamentCards} onPress={() => {
                    navigation.navigate("TournamentInfo", {
                        name: 'BOA Bracket',
                        buyIn: 5,
                        pot: 1000,
                        numUsers: 132,
                        maxUsers: 200,
                        img: require('../../assets/images/bankOfAmerica.jpeg')
                    })
                }}>
                    <View style={{backgroundColor: 'black', height: '45%'}}>
                        <Image source={require('../../assets/images/bankOfAmerica.jpeg')} style={styles.tournamentCardLogo}></Image>
                    </View>
                    <View style={{alignItems:'center'}}>
                            <Text style={styles.tournamentCardName}>BOA Bracket</Text>
                            <Text style={styles.tournamentCardInfo}>Buy-In: $5</Text>
                            <Text style={styles.tournamentCardInfo}>Total Pot: $1000</Text>
                            <View style={{flexDirection:'row', marginTop: height * .005}}>
                                <AntDesign name='user' size={20} color='white'/>
                                <Text style={styles.tournamentCardNumUsers}>132/200</Text>
                            </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tournamentCards} onPress={() => {
                    navigation.navigate("TournamentInfo", {
                        name: 'Capital One Cup',
                        buyIn: 1,
                        pot: 100,
                        numUsers: 13,
                        maxUsers: 100,
                        img: require('../../assets/images/Capital-One-Logo.png')
                    })
                }}>
                    <View style={{backgroundColor: 'white', height: '45%'}}>
                        <Image source={require('../../assets/images/Capital-One-Logo.png')} style={styles.tournamentCardLogo}></Image>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.tournamentCardName}>Capital One Cup</Text>
                        <Text style={styles.tournamentCardInfo}>Buy-In: $1</Text>
                        <Text style={styles.tournamentCardInfo}>Total Pot: $100</Text>
                        <View style={{flexDirection:'row', marginTop: height * .005}}>
                                <AntDesign name='user' size={20} color='white'/>
                                <Text style={styles.tournamentCardNumUsers}>13/100</Text>
                            </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}