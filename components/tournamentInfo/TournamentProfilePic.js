import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TournamentProfilePic({img}) {
    return (
         <View style={styles.tournamnetInfoPicContainer}>
            <Image source={img} resizeMode='contain' style={styles.stockCardLogo}/>
        </View>
    )
}