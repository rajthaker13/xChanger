import React, {PureComponent} from 'react';
import { Animated, View } from 'react-native';
import {styles} from '../../Styles';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios'


export default class StockBar extends PureComponent {
  constructor(props) {
    super(props)
    this.position = new Animated.ValueXY()
    this.state = {
      tickerText: "",
      tickerData: []
    }
  }
  componentDidMount() {
    this.getTickerInfo()
  }
  getTickerInfo() {
    axios
    .get("http://localhost:5000/ticker")
    .then((res) => this.setState((state) => {
      return {
        tickerData: res.data
      }
    }, () => {
      this.state.tickerData.map((stock) => {
        console.log(stock)
        var options = {
          method: 'GET',
          url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stock.stockName}`,
          params: {modules: 'defaultKeyStatistics,assetProfile'},
          headers: {
            'x-api-key': apiKey,
          }
        };
        axios.request(options).then((response) => {
            const apiResponse = response.data.quoteResponse.result;
            if(Array.isArray(apiResponse)) {
                apiResponse.forEach(stockData => {
                  const percentChange = stockData['regularMarketChangePercent'].toFixed(3)
                  const positiveAddedText = stock.stockName + " + " + percentChange + "%   "
                  const sameAddedText = stock.stockName + " ~ " + percentChange + "%   "
                  const negativeAddedText = stock.stockName + " - " + (-1 *percentChange) + "%   "
                  if(percentChange > 0) {
                    this.setState((state) => {
                      return {
                          tickerText: this.state.tickerText + positiveAddedText,
                        };
                  })
                  }
                  else if(percentChange == 0) {
                    this.setState((state) => {
                      return {
                          tickerText: this.state.tickerText + sameAddedText,
                        };
                  })
                  }
                  else {
                    this.setState((state) => {
                      return {
                          tickerText: this.state.tickerText + negativeAddedText,
                        };
                  })
                  }
    
                })
            }
      }).catch(function (error) {
          console.error(error);
      });
       })

    })
    )

}
  render(){
    return(
      <View style={styles.header_large}>
        <TextTicker
          style={styles.stockTickerTextUp}
          duration={10000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={0}
        >
          {this.state.tickerText}
        </TextTicker>
      </View>
    )
  }
}