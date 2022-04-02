import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfilePicture() {
    return (
        <View style={styles.profilePictureProfile}>
            <Image source={require('../../assets/images/joesmith.jpeg')} resizeMode='contain' style={styles.stockCardLogo}></Image>
        </View>
    )
}