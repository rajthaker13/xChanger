import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, Button, Pressable, Animated, Dimensions, PanResponder } from 'react-native';
import { styles } from '../../Styles';
import axios from 'axios'
import '../../global';
import StockChart from '../StockChart';



const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const testCardData = [
  { id: '0', fullName: 'Apple', stockName: 'AAPL' },
  { id: '1', stockName: 'TSLA', fullName: 'Tesla', },
]


export default class StockCard extends React.Component {
  constructor(props) {
    super(props)
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      cardDataLength: 2,
      curStockName: testCardData[0].stockName,
      sucStockName: testCardData[1].stockName,
      curStockDisplayName: testCardData[0].fullName,
      sucStockDisplayName: testCardData[1].fullName,
      curStockSrc: "",
      sucStockSrc: "",
      curStockPrice: 0.00,
      sucStockPrice: 0.00,
      range: '1d',
      interval: '15m',
      buttonSel: '1D',
      cardData: testCardData
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
  componentDidMount() {
    if (this.state.currentIndex == 0) {
      this.getStockData()
    }

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
            await this.getFinanceData(true)
            this.position.setValue({ x: 0, y: 0 })

          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(async () => {
            await this.getFinanceData(false)
            this.position.setValue({ x: 0, y: 0 })
            // this.setState((state) => {
            //   return {
            //     currentIndex: this.state.currentIndex + 1
            //   }
            // }, async () => {
            //   await this.getStockRecs(false)

            // })
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


  async getFinanceData(didSwipeRight) {
    let curCardData = this.state.cardData
    let stockName = ""
    let cur_id = this.state.currentIndex + 2
    let added = 0
    let newRec = ""
    let displayName = ""
    let curStockNameNew = ""
    let sucStockNameNew = ""
    let curStockDisplayNew = ""
    let sucStockDisplayNew = ""
    let curStockSrcNew
    let sucStockSrcNew
    let curStockPriceNew = 0
    let sucStockPriceNew = 0
    let curDomain = ""
    let sucDomain = ""

    console.log("CUR" + this.state.currentIndex)
    console.log("ijvej" + cur_id)


    try {

      //Add AWS Function Here
      var stockRecOptions = {
        method: 'GET',
        url: `https://finnhub.io/api/v1//stock/symbol?exchange=US&mic=XNYS`,
        headers: {
          'X-Finnhub-Token': financeAPIKey,
        }
      }

      await axios.get(stockRecOptions).then(async (response) => {
        var random = Math.floor(Math.random() * response.data.length) + 1
        newRec = response.data[random].symbol
        console.log(newRec)
      })

      var curPriceOptions = {
        method: 'GET',
        url: `https://finnhub.io/api/v1//quote/?symbol=${this.state.sucStockName}`,
        params: { modules: 'defaultKeyStatistics,assetProfile' },
        headers: {
          'X-Finnhub-Token': financeAPIKey,
        }
      };
      var sucPriceOptions = {
        method: 'GET',
        url: `https://finnhub.io/api/v1//quote/?symbol=${newRec}`,
        params: { modules: 'defaultKeyStatistics,assetProfile' },
        headers: {
          'X-Finnhub-Token': financeAPIKey,
        }
      };
      await axios.request(curPriceOptions).then(async (response) => {
        curStockPriceNew = response.data.c
      })
      await axios.request(sucPriceOptions).then(async (response) => {
        sucStockPriceNew = response.data.c
      })
      var curStockInfoReq = {
        method: 'GET',
        url: `https://finnhub.io/api/v1//stock/profile2/?symbol=${this.state.sucStockName}`,
        headers: {
          'X-Finnhub-Token': financeAPIKey,

        }
      };
      var sucStockInfoReq = {
        method: 'GET',
        url: `https://finnhub.io/api/v1//stock/profile2/?symbol=${newRec}`,
        headers: {
          'X-Finnhub-Token': financeAPIKey,

        }
      };
      await axios.request(curStockInfoReq).then(async (response) => {
        curStockDisplayName = response.data.name
        curStockSrcNew = response.data.logo
      })
      await axios.request(sucStockInfoReq).then(async (response) => {
        sucStockDisplayNameNew = response.data.name
        sucStockSrcNew = response.data.logo
      })
      curCardData.push({ id: cur_id, stockName: newRec, fullName: displayName })
      this.setState((state) => {
        return {
          currentIndex: cur_id,
          cardData: curCardData,
          curStockName: curStockNameNew,
          curStockDisplayName: curStockDisplayNew,
          sucStockName: sucStockNameNew,
          sucStockDisplayName: sucStockDisplayNew,
          curStockPrice: curStockPriceNew,
          sucStockPrice: sucStockPriceNew,
          curStockSrc: curStockSrcNew,
          sucStockSrc: sucStockSrcNew,
        }
      })




    } catch (err) {
      console.log(err)
    }



  }


  getStockData() {
    let newCurStockPrice = 0
    let newSucStockPrice = 0
    let newCurStockDisplayName = ""
    let newSucStockDisplayName = ""
    let newCurStockRes
    let newSucStockRes

    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = financeAPIKey
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.quote(this.state.curStockName, (error, data, response) => {
      newCurStockPrice = data.c
    })
    finnhubClient.quote(this.state.sucStockName, (error, data, response) => {
      newSucStockPrice = data.c
    });
    finnhubClient.companyProfile({ 'symbol': this.state.curStockName }, (error, data, response) => {
      newCurStockDisplayName = data.name
      newCurStockRes = data.logo
    });
    finnhubClient.companyProfile({ 'symbol': this.state.sucStockName }, (error, data, response) => {
      newSucStockDisplayName = data.name
      newSucStockRes = data.logo
    });
    this.setState((state) => {
      return {
        curStockPrice: newCurStockPrice,
        sucStockPrice: newSucStockPrice,
        curStockDisplayName: newCurStockDisplayName,
        sucStockDisplayName: newSucStockDisplayName,
        curStockSrc: newCurStockRes,
        sucStockSrc: newSucStockRes
      }
    })

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
              <Image source={{ uri: `${this.state.curStockSrc}` }} resizeMode='contain' style={styles.stockCardLogo}></Image>
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
              <Image source={{ uri: `${this.state.sucStockSrc}` }} resizeMode='contain' style={styles.stockCardLogo}></Image>
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