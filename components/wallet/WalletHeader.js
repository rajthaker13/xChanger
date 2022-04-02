import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function WalletHeader() {
    return (
    <View style={styles.walletHeader}>
        <Text style={styles.walletHeaderText}>Capital</Text>
        <TouchableOpacity style={styles.walletHeaderAddFundsButton}>
            <Text style={styles.walletHeaderAddFundsButtonText}>Add Funds</Text>
        </TouchableOpacity>
        <View style={{marginLeft: width * .15}}>
        <Text style={styles.walletHeaderText}>$252.76</Text>
        </View>
    </View>
    )
}