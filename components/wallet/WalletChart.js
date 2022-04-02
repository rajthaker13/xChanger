import React, {useState} from 'react';
import {Image, Text, View, Pressable} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StockChart from '../StockChart';

export default function WalletChart() {
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
        else if(newRange == 'ALL') {
            setRange('max');
            setInterval('1wk');
        }
        else{
            setRange('5y');
            setInterval('1mo');

        }
    }
    return (
    <View>
        <View style={styles.header_large}>
            <View style={{flexDirection:'column'}}>
                <Text style={styles.walletChartTotalAmountText}>$523.18</Text>
                <View style={{flexDirection:'row'}}>
                    <Ionicons
                        name='ios-triangle'
                        size={15}
                        color='#18FE04'
                        style={styles.walletChartTotalAmountArrow}
                    />
                    <Text style={styles.walletChartTotalAmountDetailsText}>$53.97 (11.36%)</Text>
                    <Text style={styles.walletChartTotalAmountTimeText}>Past 3 Months</Text>
                </View>
            </View>
        </View>
            <StockChart stockName={'AAPL'} range={range} interval={interval} width={width} height={height*.35}/> 
            <View style={styles.walletChartLabelContainer}>
                <Pressable onPress={() => changeRange('1D')} style={buttonSel == '1D' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1D</Text>
                </Pressable>
                <Pressable onPress={() => changeRange('1W')} style={buttonSel == '1W' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1W</Text>
                </Pressable>
                <Pressable title={'1M'} onPress={() => changeRange('1M')} style={buttonSel == '1M' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1M</Text>
                </Pressable>
                <Pressable title={'3M'} onPress={() => changeRange('3M')} style={buttonSel == '3M' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>3M</Text>
                </Pressable>
                <Pressable title={'1Y'} onPress={() => changeRange('1Y')} style={buttonSel == '1Y' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>1Y</Text>
                </Pressable>
                <Pressable title={'5Y'} onPress={() => changeRange('5Y')} style={buttonSel == '5Y' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>5Y</Text>
                </Pressable>
                <Pressable title={'ALL'} onPress={() => changeRange('ALL')} style={buttonSel == 'ALL' ? styles.walletButton_sel:styles.button_unSel}>
                    <Text style={styles.button_text}>ALL</Text>
                </Pressable>
            </View>   
    </View>
    )
}