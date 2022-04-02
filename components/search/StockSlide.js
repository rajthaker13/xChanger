import React, {useEffect, useState} from 'react';
import {Text, View, Image, Button, Pressable} from 'react-native';
import {styles} from '../../Styles';


export default function StockSlide() {
    const [stockRes, setStockRes] = useState(['AAPL', 'TSLA', 'GOOG']);
    //Need to make this a map somehwo eventually
    return(
        <View style={{marginTop:5}}>
            <View style={styles.stockSlideContainer}>
                <View style={styles.stockSlideLogoContainer}>
                    <Image source={require('../../assets/images/apple.png')} resizeMode='contain' style={styles.stockCardLogo}></Image>
                </View>
                <Text style={styles.stockSlideText}>APPLE INC. (AAPL)</Text>
            </View>
            <View style={styles.stockSlideContainer}>
                <View style={styles.stockSlideLogoContainer}>
                    <Image source={require('../../assets/images/tesla.jpeg')} resizeMode='contain' style={styles.stockCardLogo}></Image>
                </View>
                <Text style={styles.stockSlideText}>TESLA INC. (TSLA)</Text>
            </View>
            <View style={styles.stockSlideContainer}>
                <View style={styles.stockSlideLogoContainer}>
                    <Image source={require('../../assets/images/abc.png')} resizeMode='contain' style={styles.stockCardLogo}></Image>
                </View>
                <Text style={styles.stockSlideText}>ALPHABET INC. (GOOG)</Text>
            </View>
            <View style={styles.stockSlideContainer}>
                <Text style={styles.viewSlideText}>VIEW ALL HOT STOCKS</Text>
            </View>
            <View style={styles.stockSlideContainer}>
                <Text style={styles.viewSlideText}>VIEW BY CATEGORY</Text>
            </View>
        </View>
    );
}