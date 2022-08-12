import React, { PureComponent } from 'react';
import { Animated, View } from 'react-native';
import { styles } from '../../Styles';
import TextTicker from 'react-native-text-ticker';
import axios from 'axios'
import '../../global';

export default class StockBar extends PureComponent {
  constructor(props) {
    super(props)
    this.position = new Animated.ValueXY()
    this.state = {
      tickerText: "",
      tickerData: []
    }
  }
  async componentDidMount() {
    await this.getTickerInfo()
  }
  getTickerInfo() {
    axios
      .get("http://localhost:5000/ticker")
      .then((res) => {
        let newTickerText = "";
        const data = res.data
        data.forEach(stock => {
          for (let i = 0; i < 100; i++) {
            const tick = stock.results[i].ticker
            console.log(tick)
            var options = {
              method: 'GET',
              url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${tick}`,
              params: { modules: 'defaultKeyStatistics,assetProfile' },
              headers: {
                'x-api-key': apiKey,
              }
            };
            axios.request(options).then((response) => {
              const apiResponse = response.data.quoteResponse.result;
              if (Array.isArray(apiResponse)) {
                apiResponse.forEach(stockData => {
                  const percentChange = stockData['regularMarketChangePercent'].toFixed(3)
                  const positiveAddedText = tick + " + " + percentChange + "%   "
                  const sameAddedText = tick + " ~ " + percentChange + "%   "
                  const negativeAddedText = tick + " - " + (-1 * percentChange) + "%   "
                  if (percentChange > 0) {
                    newTickerText = newTickerText + positiveAddedText
                  }
                  else if (percentChange == 0) {
                    newTickerText = newTickerText + sameAddedText;
                  }
                  else {
                    newTickerText = newTickerText + negativeAddedText;
                  }

                })
              }
            }).catch(function (error) {
              console.error(error);
            });
          }

        });
        this.setState((state) => {
          return {
            tickerText: newTickerText,
          };
        })

      }
      )

  }
  render() {
    return (
      <View style={styles.header_large}>
        <TextTicker
          style={styles.stockTickerTextUp}
          duration={50000}
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