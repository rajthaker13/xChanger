import * as React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../Styles';

export default function SearchHeader() {
    return (
        <View style={styles.header_large}>
            <Text style={styles.headerText}>Search</Text>
        </View>
    )
}