import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TourneyHeaderSlide(props) {
    return (
    <View style={styles.watchListTourneyHeader}>
        <View style={styles.watchListTourneyProfileContainer}>
          <Image source={props.img} style={styles.profilePicImage} resizeMode='contain'/>
        </View>
        <Text style={styles.watchListTourneyName}>{props.name}</Text>
        <Text style={styles.watchListTourneyRank}>Rank: {props.rank}/{props.maxUsers}</Text>
      </View>
    )
}