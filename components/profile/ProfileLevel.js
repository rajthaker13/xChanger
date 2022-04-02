import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileLevel() {
    return (
        <View style={styles.profileLevelContainer}>
            <Text style={styles.profileLevelLabelText}>LEVEL</Text>
            <Text style={styles.profileLevelNumberText}>36</Text>
        </View>
    )
}