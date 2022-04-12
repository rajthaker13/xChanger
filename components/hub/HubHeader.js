import * as React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HubHeader() {
    return (
        <View style={styles.header_large}>
            <Image source={require('../../assets/images/XChanger.png')} resizeMode='contain' style={styles.xChangerLogoHub}></Image>
            <Text style={styles.hubHeaderText}>CHANGER HUB</Text>
            <MaterialCommunityIcons name='message-outline' color='white' size={height * .04} style={{marginTop:height*.02, marginLeft:width*.02}}/>
            <TouchableOpacity>
                <MaterialCommunityIcons name='binoculars' color='white' size={height * .04} style={{marginTop:height*.02, marginLeft:width*.02}}/>
            </TouchableOpacity>
         </View>
    )
}