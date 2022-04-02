import * as React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {styles} from '../../Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Tournaments() {
    return (
        <View>
            <Text style={styles.tournamentsHeader}>TOURNAMENTS</Text>
            <ScrollView horizontal={true}>
                <View style={styles.tournamentCards}>
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
                </View>
                <View style={styles.tournamentCards}>
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
                </View>
                <View style={styles.tournamentCards}>
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
                </View>
            </ScrollView>
        </View>
    )
}