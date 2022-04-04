import React, {useState, useEffect} from 'react';
import {Image, Text, View, Button, Pressable} from 'react-native';
import {styles} from '../Styles';
import StockChart from './StockChart';
import axios from 'axios'


<<<<<<< HEAD
export default function ProfilePortfolio(props) {
    const[typeOfTrade, setTypeOfTrade] = useState('Stocks');
    const [tradesArray, setTradesArray] = useState(props.tradesArray)
=======
export default function ProfilePortfolio() {
    const[typeOfTrade, setTypeOfTrade] = useState('Stocks');
    const [tradesArray, setTradesArray] = useState(['UWMC', 'SPCE'])
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607
    const[priceArray,setPriceArray] = useState([])
    function changeRange(newRange) {
        setTypeOfTrade(newRange);
    }
    function getTradePrices() {
        tradesArray.map(trade => {
            var options = {
                method: 'GET',
                url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${trade}`,
                params: {modules: 'defaultKeyStatistics,assetProfile'},
                headers: {
                  'x-api-key': apiKey,
                }
              };
              axios.request(options).then(function (response) {
                  const apiResponse = response.data.quoteResponse.result;
                  if(Array.isArray(apiResponse)) {
                      apiResponse.forEach(stockData => {
                          const price = stockData['regularMarketPrice']
                          setPriceArray(oldPriceArray => [...oldPriceArray, price]);
                          
                      })
                  }
            }).catch(function (error) {
                console.error(error);
            });

        })
    }
    useEffect(() => {
        getTradePrices()

    }, [typeOfTrade])
    return (
        <View>
            <View style={styles.profilePortfolioSelection}>
                <Pressable title={'Stocks'} onPress={() => changeRange('Stocks')}>
                    <Text style={typeOfTrade == 'Stocks' ? styles.profilePortfolioButtonTextSelected:styles.profilePortfolioButtonTextUnselected}>Stocks</Text>
                </Pressable>
                <Pressable title={'ETFs'} onPress={() => changeRange('ETFs')}>
                    <Text style={typeOfTrade == 'ETFs' ? styles.profilePortfolioButtonTextSelected:styles.profilePortfolioButtonTextUnselected}>ETFs</Text>
                </Pressable>
                <Pressable title={'Options'} onPress={() => changeRange('Options')}>
                    <Text style={typeOfTrade == 'Options' ? styles.profilePortfolioButtonTextSelected:styles.profilePortfolioButtonTextUnselected}>Options</Text>
                </Pressable>
                <Pressable title={'Crypto'} onPress={() => changeRange('Crypto')}>
                   <Text style={typeOfTrade == 'Crypto' ? styles.profilePortfolioButtonTextSelected:styles.profilePortfolioButtonTextUnselected}>Crypto</Text>
                </Pressable>
                <Pressable title={'Tournys'} onPress={() => changeRange('Tournys')}>
                    <Text style={typeOfTrade == 'Tournys' ? styles.profilePortfolioButtonTextSelected:styles.profilePortfolioButtonTextUnselected}>Tournys</Text>
                </Pressable>
            </View>
            <View>
                <View style={styles.profilePortfolioSlideContainer}>
                    <View style={styles.profilePortfolioSlideInfo}>
                        <Text style={styles.profilePortfolioSlideTradeName}>UWMC</Text>
                        <Text style={styles.profilePortfolioSlideNumShares}>6.78 shares</Text>
                    </View>
                    <View style={styles.profilePortfolioSlideChartContainer}>
                        <StockChart stockName={'UWMC'} range={'1y'} interval={'1wk'} width={width*.4} height={height*.075}/>
                    </View>
                    <View style={styles.profilePortfolioSlidePriceContainer}>
                        <Text style={styles.profilePortfolioSlidePriceText}>${parseFloat(priceArray[0]).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.profilePortfolioSlideContainer}>
                    <View style={styles.profilePortfolioSlideInfo}>
                        <Text style={styles.profilePortfolioSlideTradeName}>SPCE</Text>
                        <Text style={styles.profilePortfolioSlideNumShares}>.138753 shares</Text>
                    </View>
                    <View style={styles.profilePortfolioSlideChartContainer}>
                        <StockChart stockName={'SPCE'} range={'1y'} interval={'1wk'} width={width*.4} height={height*.075}/>
                    </View>
                    <View style={styles.profilePortfolioSlidePriceContainer}>
                        <Text style={styles.profilePortfolioSlidePriceText}>${parseFloat(priceArray[1]).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}