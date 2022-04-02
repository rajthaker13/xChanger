import React, {useEffect, useState} from 'react';
import {Text, View, Image, Button, Pressable, Animated} from 'react-native';
import {styles} from '../../Styles';
import axios from 'axios'
import '../../global';
import StockChart from '../StockChart';


export default function StockCard() {
    const [stockName, setStockName] = useState('AAPL');
    const [price, setPrice] = useState(0.00);
    const[range, setRange] = useState('1d');
    const[interval,setInterval] = useState('15m');
    const[buttonSel, setButtonSel] = useState('1D');
    function changeRange(newRange) {
        setButtonSel(newRange);
        if(newRange == '1D') {
            setRange('1d');
            setInterval('15m');
        }
        else if(newRange == '1W') {
            setRange('5d');
            setInterval('15m');


        }
        else if(newRange == '1M') {
            setRange('1mo');
            setInterval('1d');

        }
        else if(newRange == '3M') {
            setRange('3mo');
            setInterval('1d');

        }
        else if(newRange == '1Y') {
            setRange('1y');
            setInterval('1wk');

        }
        else{
            setRange('5y');
            setInterval('1mo');

        }
    }

    function getStockPrice() {
        var options = {
            method: 'GET',
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockName}`,
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'x-api-key': apiKey,
            }
          };
          axios.request(options).then(function (response) {
              const apiResponse = response.data.quoteResponse.result;
              if(Array.isArray(apiResponse)) {
                  apiResponse.forEach(stockData => {
                      setPrice(stockData['regularMarketPrice'])
                  })
              }
        }).catch(function (error) {
            console.error(error);
        });
    }

    // function getStockChart() {
    //     var options = {
    //         method: 'GET',
    //         url: `https://yfapi.net/v8/finance/chart/${stockName}?range=1d&region=US&interval=15m&lang=en`,
    //         params: {modules: 'defaultKeyStatistics,assetProfile'},
    //         headers: {
    //           'x-api-key': apiKey,
    //         }
    //       };
    //       axios.request(options).then(function (response) {
    //           const apiResponse = response.data.chart.result;
    //           if(Array.isArray(apiResponse)) {
    //               apiResponse.forEach(stockData => {
    //                   console.log(stockData);
    //               })
    //           }
    //     }).catch(function (error) {
    //         console.error(error);
    //     });

    // }
    useEffect(() => {
        getStockPrice();

    }, [])
    return (
        <View style={styles.stockCard}>
            <View style={styles.stockCardLogoContainer}>
                <Image source={require('../../assets/images/apple.png')} resizeMode='contain' style={styles.stockCardLogo}></Image>
            </View>
                <Text style={styles.stockCardName}>Apple Inc. (AAPL)</Text>
            <Text style={styles.stockCardPrice}>${price}</Text>
            <View  style={{marginHorizontal:'15%', marginTop: '3%'}}>
                <StockChart stockName={stockName} range={range} interval={interval} width={width*.6} height={height*.15}/>
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginHorizontal: '15%'}}>
                <Pressable onPress={() => changeRange('1D')} style={buttonSel == '1D' ? styles.button_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1D</Text>
                </Pressable>
                <Pressable onPress={() => changeRange('1W')} style={buttonSel == '1W' ? styles.button_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1W</Text>
                </Pressable>
                <Pressable title={'1M'} onPress={() => changeRange('1M')} style={buttonSel == '1M' ? styles.button_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1M</Text>
                </Pressable>
                <Pressable title={'3M'} onPress={() => changeRange('3M')} style={buttonSel == '3M' ? styles.button_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>3M</Text>
                </Pressable>
                <Pressable title={'1Y'} onPress={() => changeRange('1Y')} style={buttonSel == '1Y' ? styles.button_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1Y</Text>
                </Pressable>
                <Pressable title={'5Y'} onPress={() => changeRange('5Y')} style={buttonSel == '5Y' ? styles.button_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>5Y</Text>
                </Pressable>
            </View>
        </View>
    )
}