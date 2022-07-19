import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, Button, Pressable, Animated, Dimensions, PanResponder } from 'react-native';
import { styles } from '../../Styles';
import axios from 'axios'
import '../../global';
import StockChart from '../StockChart';



const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const demoDayData = [
  { id: '0', fullName: 'Apple', stockName: 'AAPL', src: require('../../assets/demoLogos/apple.png') },
  { id: '1', stockName: 'TSLA', fullName: 'Tesla', src: require('../../assets/demoLogos/tesla.png') },
  { id: '2', stockName: 'AMZN', fullName: 'Amazon', src: require('../../assets/demoLogos/amazon.png') },
  { id: '3', stockName: 'MSFT', fullName: 'Microsoft', src: require('../../assets/demoLogos/microsoft.png') },
  { id: '4', stockName: 'NFLX', fullName: 'Netflix', src: require('../../assets/demoLogos/netflix.jpeg') },
  { id: '5', stockName: 'NKE', fullName: 'Nike', src: require('../../assets/demoLogos/nike.png') },
  { id: '6', stockName: 'BA', fullName: 'Boeing', src: require('../../assets/demoLogos/boeing.png') },
  { id: '7', stockName: 'JPM', fullName: 'JP Morgan', src: require('../../assets/demoLogos/jpmorgan.png') },
  { id: '8', stockName: 'META', fullName: 'Meta Platforms', src: require('../../assets/demoLogos/meta.png') },
  { id: '9', stockName: 'JNJ', fullName: 'Johnson & Johnson', src: require('../../assets/demoLogos/johnson.jpeg') },
  { id: '10', stockName: 'V', fullName: 'Visa Inc.', src: require('../../assets/demoLogos/visa.png') },
  { id: '11', stockName: 'WMT', fullName: 'Walmart Inc.', src: require('../../assets/demoLogos/walmart.png') },
  { id: '12', stockName: 'MA', fullName: 'Mastercard Inc.', src: require('../../assets/demoLogos/mastercard.png') },
  { id: '13', stockName: 'HD', fullName: 'Home Depot', src: require('../../assets/demoLogos/homedepot.png') },
  { id: '14', stockName: 'BAC', fullName: 'Bank of America', src: require('../../assets/demoLogos/boa.png') },
  { id: '15', stockName: 'PEP', fullName: 'PepsiCo Inc.', src: require('../../assets/demoLogos/pepsi.png') },
  { id: '16', stockName: 'ORCL', fullName: 'Oracle Corporation', src: require('../../assets/demoLogos/oracle.png') },
  { id: '17', stockName: 'ADBE', fullName: 'Adobe Inc.', src: require('../../assets/demoLogos/adobe.png') },
  { id: '18', stockName: 'T', fullName: 'AT&T Inc.', src: require('../../assets/demoLogos/atat.png') },
  { id: '19', fullName: 'CVS', stockName: 'CVS Health Co.', src: require('../../assets/demoLogos/cvs.png') },
  { id: '20', fullName: 'INTU', stockName: 'Intuit Inc.', src: require('../../assets/demoLogos/intuit.png') },
  { id: '21', fullName: 'PG', stockName: 'Procter & Gamble', src: require('../../assets/demoLogos/pg.png') },
  { id: '22', fullName: 'PYPL', stockName: 'PayPal Holdings', src: require('../../assets/demoLogos/paypal.png') },
  { id: '23', fullName: 'DKNG', stockName: 'DraftKings Inc.', src: require('../../assets/demoLogos/draftKings.png') },
  { id: '24', fullName: 'CMG', stockName: 'Chipotle Mexican Grill', src: require('../../assets/demoLogos/chipotle.png') },
  { id: '25', fullName: 'M', stockName: `Macy's Inc.`, src: require('../../assets/demoLogos/macy.png') },

]
export default class StockCard extends React.Component {
  constructor(props) {
    super(props)
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      cardDataLength: 2,
      curStockName: demoDayData[0].stockName,
      sucStockName: demoDayData[1].stockName,
      curStockDisplayName: demoDayData[0].fullName,
      sucStockDisplayName: demoDayData[1].fullName,
      curStockSrc: demoDayData[0].src,
      sucStockSrc: demoDayData[1].src,
      curStockPrice: 0.00,
      sucStockPrice: 0.00,
      range: '1d',
      interval: '15m',
      buttonSel: '1D',
      cardData: demoDayData,
      hasRendered: false,
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }


  async UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(async () => {
            this.position.setValue({ x: 0, y: 0 })
            await this.getStockRecsDemo(true)
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(async () => {
            this.position.setValue({ x: 0, y: 0 })
            await this.getStockRecsDemo(true)

          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
    if (this.state.currentIndex == 0) {
      await this.getStockRecsDemo(false)
    }
  }

  changeRange(newRange) {
    this.setState((state) => {
      return {
        buttonSel: newRange,
      };
    })
    if (newRange == '1D') {
      this.setState((state) => {
        return {
          range: '1d',
          interval: '15m'
        };
      })
    }
    else if (newRange == '1W') {
      this.setState((state) => {
        return {
          range: '5d',
          interval: '15m'
        };
      })


    }
    else if (newRange == '1M') {
      this.setState((state) => {
        return {
          range: '1mo',
          interval: '1d'
        };
      })

    }
    else if (newRange == '3M') {
      this.setState((state) => {
        return {
          range: '3mo',
          interval: '1d'
        };
      })

    }
    else if (newRange == '1Y') {
      this.setState((state) => {
        return {
          range: '1y',
          interval: '1wk'
        };
      })

    }
    else {
      this.setState((state) => {
        return {
          range: '5y',
          interval: '1mo'
        };
      })

    }
  }



  async getStockRecsDemo(didSwipeRight) {
    let curCardData = this.state.cardData
    let cur_id = 0
    let curStockNameNew = ""
    let sucStockNameNew = ""
    let curStockDisplayNew = ""
    let sucStockDisplayNew = ""
    let sucStockPriceNew = 0
    let curStockPriceNew = 0

    if (!didSwipeRight) {
      cur_id = this.state.currentIndex
      curStockNameNew = curCardData[0].stockName
      curStockDisplayNew = curCardData[0].fullName
      sucStockNameNew = curCardData[1].stockName
      sucStockDisplayName = curCardData[1].fullName
      curStockSrcNew = curCardData[0].src
      sucStockSrcNew = curCardData[1].src
    }
    else {
      cur_id = this.state.currentIndex + 1
      curStockNameNew = this.state.sucStockName
      curStockDisplayNew = this.state.sucStockDisplayName
      sucStockNameNew = curCardData[cur_id + 1].stockName
      sucStockDisplayName = curCardData[cur_id + 1].fullName
      curStockSrcNew = curCardData[cur_id].src
      sucStockSrcNew = curCardData[cur_id + 1].src

    }


    try {
      var curOptions = {
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${curStockNameNew}`,
        params: { modules: 'defaultKeyStatistics,assetProfile' },
        headers: {
          'x-api-key': apiKey,
        }
      };
      var sucOptions = {
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${sucStockNameNew}`,
        params: { modules: 'defaultKeyStatistics,assetProfile' },
        headers: {
          'x-api-key': apiKey,
        }
      };

      await axios.request(curOptions).then(async (curRes) => {
        const curAPIResponse = curRes.data.quoteResponse.result
        if (Array.isArray(curAPIResponse)) {
          curAPIResponse.forEach((curStockData) => {
            curStockPriceNew = curStockData['regularMarketPrice']
          })
        }
      })

      await axios.request(sucOptions).then(async (sucRes) => {
        const sucAPIResponse = sucRes.data.quoteResponse.result
        if (Array.isArray(sucAPIResponse)) {
          sucAPIResponse.forEach((sucStockData) => {
            sucStockPriceNew = sucStockData['regularMarketPrice']
          })
        }
      })
      this.setState((state) => {
        return {
          currentIndex: cur_id,
          curStockName: curStockNameNew,
          curStockDisplayName: curStockDisplayNew,
          sucStockName: sucStockNameNew,
          sucStockDisplayName: sucStockDisplayNew,
          curStockPrice: curStockPriceNew,
          sucStockPrice: sucStockPriceNew,
          curStockSrc: curStockSrcNew,
          sucStockSrc: sucStockSrcNew,
          hasRendered: true,
        }
      })
    } catch (err) {
      console.log(err)
      console.log(err)
    }


  }



  renderCards = () => {

    return this.state.cardData.map((item) => {


      if (item.id < this.state.currentIndex) {
        return null
      }
      else if (item.id == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, styles.stockCard]
            }>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <View style={styles.stockCardLogoContainer}>
              <Image source={this.state.curStockSrc} resizeMode='contain' style={styles.stockCardLogo}></Image>
            </View>
            <Text style={styles.stockCardName}>{item.fullName}</Text>
            <Text style={styles.stockCardPrice}>${this.state.curStockPrice.toFixed(2)}</Text>
            <View style={{ marginHorizontal: '15%', marginTop: '3%' }}>
              <StockChart stockName={this.state.curStockName} range={this.state.range} interval={this.state.interval} width={width * .6} height={height * .15} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '15%' }}>
              <Pressable onPress={() => this.changeRange('1D')} style={this.state.buttonSel == '1D' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1D</Text>
              </Pressable>
              <Pressable onPress={() => this.changeRange('1W')} style={this.state.buttonSel == '1W' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1W</Text>
              </Pressable>
              <Pressable title={'1M'} onPress={() => this.changeRange('1M')} style={this.state.buttonSel == '1M' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1M</Text>
              </Pressable>
              <Pressable title={'3M'} onPress={() => this.changeRange('3M')} style={this.state.buttonSel == '3M' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>3M</Text>
              </Pressable>
              <Pressable title={'1Y'} onPress={() => this.changeRange('1Y')} style={this.state.buttonSel == '1Y' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1Y</Text>
              </Pressable>
              <Pressable title={'5Y'} onPress={() => this.changeRange('5Y')} style={this.state.buttonSel == '5Y' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>5Y</Text>
              </Pressable>
            </View>

          </Animated.View>
        )
      }
      else if (item.id - 1 == this.state.currentIndex) {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
            }, styles.stockCard]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>


            <View style={styles.stockCardLogoContainer}>
              <Image source={this.state.sucStockSrc} resizeMode='contain' style={styles.stockCardLogo}></Image>
            </View>
            <Text style={styles.stockCardName}>{item.fullName}</Text>
            <Text style={styles.stockCardPrice}>${this.state.sucStockPrice.toFixed(2)}</Text>
            <View style={{ marginHorizontal: '15%', marginTop: '3%' }}>
              <StockChart stockName={this.state.sucStockName} range={this.state.range} interval={this.state.interval} width={width * .6} height={height * .15} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '15%' }}>
              <Pressable onPress={() => this.changeRange('1D')} style={this.state.buttonSel == '1D' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1D</Text>
              </Pressable>
              <Pressable onPress={() => this.changeRange('1W')} style={this.state.buttonSel == '1W' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1W</Text>
              </Pressable>
              <Pressable title={'1M'} onPress={() => this.changeRange('1M')} style={this.state.buttonSel == '1M' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1M</Text>
              </Pressable>
              <Pressable title={'3M'} onPress={() => this.changeRange('3M')} style={this.state.buttonSel == '3M' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>3M</Text>
              </Pressable>
              <Pressable title={'1Y'} onPress={() => this.changeRange('1Y')} style={this.state.buttonSel == '1Y' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>1Y</Text>
              </Pressable>
              <Pressable title={'5Y'} onPress={() => this.changeRange('5Y')} style={this.state.buttonSel == '5Y' ? styles.button_sel : styles.button_unSel}>
                <Text style={styles.button_text}>5Y</Text>
              </Pressable>
            </View>

          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.renderCards()}
        </View>
        <View style={{ height: 60 }}>
        </View>
      </View>
    )

  }
}