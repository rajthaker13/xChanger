import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileHeader() {
    return (
        <View style={styles.profile_header}>
            <Text style={styles.profileHeaderText}>joesmith101</Text>
            <Ionicons
                    name='ios-trophy-outline'
                    size={40}
                    color='white'
                    style={styles.trophyButtonProfile}
                />
            <Ionicons
                    name='ios-menu-outline'
                    size={60}
                    color='white'
                    style={styles.menuButtonProfile}
                />
        </View>
    )
}