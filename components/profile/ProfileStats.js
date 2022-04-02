import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileStats() {
    return (
        <View>
            <View style={styles.profileStats}>
                <Text style={styles.profileStatsText}>777</Text>
                <Text style={styles.profileStatsText}>333</Text>
            </View>
            <View style={styles.profileStats}>
                <Text style={styles.profileStatsLabelText}>Followers</Text>
                <Text style={styles.profileStatsLabelText}>Following</Text>
            </View>
         </View>
    )
}