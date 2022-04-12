import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TournamentInfoHeader({name, buyIn, pot, numUsers, maxUsers}) {
    return (
        <View style={{flexDirection:'column'}}>
            <Text style={styles.tournamentInfoHeaderName}>{name}</Text>
            <View style={{flexDirection:'row'}}>
                <View style={styles.tournamentInfoMoneyContainer}>
                    <Text style={styles.profileLevelLabelText}>Buy-In</Text>
                    <Text style={styles.profileLevelNumberText}>${buyIn}</Text>
                </View>
                <View style={styles.tournamentInfoMoneyContainer}>
                    <Text style={styles.profileLevelLabelText}>Total Pot</Text>
                    <Text style={styles.profileLevelNumberText}>${pot}</Text>
                </View>
            </View>
            <View style={styles.tournamentInfoMoneyContainerSingle}>
                    <Text style={styles.profileLevelLabelText}>Mock Currency:</Text>
                    <Text style={styles.profileLevelNumberText}>${pot * buyIn}</Text>
            </View>
        </View>
    )
}
