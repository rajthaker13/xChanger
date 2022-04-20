import React, {useEffect} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../global';
import axios from 'axios'

export default class StockSlide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            src: '',
            fullName: props.fullName,
            stockName: props.stockName,
            stockPrice: 0.00,
            percentChange: 0.00,
        }
    }

    async componentDidMount() {
        let domain = ''
        let curSrc = ''
        let curPrice = 0
        let curChange = 0
        var domainOptions = {
            method: 'GET',
            url: `https://yfapi.net/v11/finance/quoteSummary/${this.state.stockName}?lang=en&region=US&modules=defaultKeyStatistics%2CassetProfile`,
            headers: {
              'x-api-key': apiKey,

            }
          };
          await axios.request(domainOptions).then((curDRes) => {
            const curDResponse = (curDRes.data.quoteSummary.result)
            if(Array.isArray(curDResponse)) {
              curDResponse.forEach((c) => {
                let tempCurDomain = (c['assetProfile'].website)
                domain = tempCurDomain.substring(tempCurDomain.indexOf('.') + 1, tempCurDomain.lastIndexOf('.'))
              })
            }
          })
          var picOptions = {
            method: 'GET',
            url: `https://api.brandfetch.io/v2/brands/${domain}.com`,
            headers: {
              Authorization: `Bearer ${brandAPI2}`

            }
          };
          await axios.request(picOptions).then(async (curPicRes) => {
            const curResArray = JSON.parse(JSON.stringify(curPicRes)).data.logos[0].formats;
            curResArray.forEach(async (curFormat) => {
              if(!curFormat.format.includes('svg')) {
                curSrc = curFormat.src
              }
            })
          })
          var priceOptions = {
            method: 'GET',
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${this.state.stockName}`,
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'x-api-key': apiKey,
            }
          };
          await axios.request(priceOptions).then(async (curRes) => {
            const curAPIResponse = curRes.data.quoteResponse.result
            if(Array.isArray(curAPIResponse)) {
              curAPIResponse.forEach((curStockData) => {
                curPrice = curStockData['regularMarketPrice']
                curChange = curStockData['fiftyDayAverageChangePercent']
              })
            }
          })
          this.setState((state) => {
              return {
                  src: curSrc,
                  stockPrice: curPrice,
                  percentChange: curChange
              }
          })
        }
        render() {    
            return (
            <View style={styles.watchListTourneyStockSlide}>
            <View style={styles.watchListTourneyProfileContainer}>
                <Image source={{uri:`${this.state.src}`}} style={styles.profilePicImage} resizeMode='contain'/>
              </View>
              <Text style={styles.watchListStockName}>{this.state.fullName}</Text>
              <Text style={styles.watchListStockInfo}>Price: {this.state.stockPrice.toFixed(2)} ({this.state.percentChange.toFixed(2)}%)</Text>
              <TouchableOpacity style={styles.watchListEditButton}>
                   <Text style={styles.watchListEditButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
        )

        }
}