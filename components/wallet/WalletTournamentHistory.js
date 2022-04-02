import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function WalletTournamentHistory() {
    return (
    <View>
        <View style={styles.walletTourneyHeader}>
            <Text style={styles.walletTourneyHeaderText}>Tournament History</Text>
        </View>
        <View style={styles.profilePortfolioSlideContainer}>
            <View style={styles.walletTournySlideLogoContainer}>
                <Image source={require('../../assets/images/jpMorgan.png')} resizeMode='contain' style={styles.stockCardLogo}></Image>
            </View>
            <View style={{flexDirection:'column', marginLeft: width * .03, marginTop:height * .03, width: width * .5}}>
                <Text style={styles.walletTournySlideNameText}>J.P. Morgan Challenge</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.walletTournySlideBuyInText}>Buy-In: $10</Text>
                    <Text style={styles.walletTournySlideWinningsPosText}>Winnings: $100</Text>
                </View>
            </View>
            <SimpleLineIcons name='arrow-right' color='white' size={20} style={styles.walletTournySlideArrow}/>
        </View>
        <View style={styles.profilePortfolioSlideContainer}>
            <View style={styles.walletTournySlideLogoContainer}>
                <Image source={require('../../assets/images/bankOfAmerica.jpeg')} resizeMode='contain' style={styles.stockCardLogo}></Image>
            </View>
            <View style={{flexDirection:'column', marginLeft: width * .03, marginTop:height * .03, width: width * .5}}>
                <Text style={styles.walletTournySlideNameText}>BOA Bracket</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.walletTournySlideBuyInText}>Buy-In: $10</Text>
                    <Text style={styles.walletTournySlideWinningsNegText}>Winnings: $5</Text>
                </View>
            </View>
            <SimpleLineIcons name='arrow-right' color='white' size={20} style={styles.walletTournySlideArrow}/>
        </View>
    </View>
    
    )
}