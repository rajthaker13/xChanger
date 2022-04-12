import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Image, Button, Pressable, Animated, Dimensions, PanResponder} from 'react-native';
import {styles} from '../../Styles';
import axios from 'axios'
import '../../global';
import StockChart from '../StockChart';



const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const testCardData = [
    {id:'0', fullName:'Apple', stockName:'AAPL'}, 
    {id:'1', stockName:'TSLA',fullName:'Tesla', }, 

]
export default class StockCard extends React.Component {
    constructor(props) {
        super(props)
        this.position = new Animated.ValueXY()
        this.state = {
          currentIndex: 0,
          cardDataLength: 2,
          curStockName:testCardData[0].stockName,
          sucStockName:testCardData[1].stockName, 
          curStockDisplayName: testCardData[0].fullName,
          sucStockDisplayName:testCardData[1].fullName, 
          curStockSrc:"",
          sucStockSrc:"",
          curStockPrice: 0.00,
          sucStockPrice: 0.00,
          range: '1d',
          interval: '15m',
          buttonSel:'1D',
          cardData : testCardData
        }
        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
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
        if(this.state.currentIndex == 0) {
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
                // this.setState((state) => {
                //   return {
                //     currentIndex: this.state.currentIndex + 1 
                //   }
                // }, async () => {
                  this.position.setValue({ x: 0, y: 0 })
                  await this.getStockRecs(true)
                  
                // })
              })
            }
            else if (gestureState.dx < -120) {
              Animated.spring(this.position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
              }).start(async () => {
                // this.setState((state) => {
                //   return {
                //     currentIndex: this.state.currentIndex + 1 
                //   }
                // }, async () => {
                  this.position.setValue({ x: 0, y: 0 })
                  await this.getStockRecs(false)
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
        if(newRange == '1D') {
            this.setState((state) => {
                return {
                    range: '1d',
                    interval:'15m'
            };
            })
        }
        else if(newRange == '1W') {
            this.setState((state) => {
                return {
                    range: '5d',
                    interval:'15m'
            };
            })


        }
        else if(newRange == '1M') {
            this.setState((state) => {
                return {
                    range: '1mo',
                    interval:'1d'
            };
            })

        }
        else if(newRange == '3M') {
            this.setState((state) => {
                return {
                    range: '3mo',
                    interval:'1d'
            };
            })

        }
        else if(newRange == '1Y') {
            this.setState((state) => {
                return {
                    range: '1y',
                    interval:'1wk'
            };
            })

        }
        else{  
            this.setState((state) => {
                return {
                    range: '5y',
                    interval:'1mo'
            };
            })

        }
    }




    async getStockRecs(didSwipeRight) {
      let curCardData = this.state.cardData
      let stockName = ""
      let start_id = this.state.cardDataLength
      let added = 0
      if(this.state.currentIndex == 1) {
        start_id = 2
      }
      if(didSwipeRight) {
        stockName = curCardData[0].stockName
      }
      else {
        stockName = curCardData[1].stockName
      }
      curCardData.shift()
      var options  = {
        method: 'GET',
        url: `https://yfapi.net/v6/finance/recommendationsbysymbol/${stockName}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': apiKey,
        }
        
      };
      try{
        await axios.request(options).then((response) => {
          const apiResponse = response.data.finance.result[0]['recommendedSymbols']
          if(Array.isArray(apiResponse)) {
            apiResponse.forEach(async (rec) => {
              const symbol = rec.symbol
              var optionsJr = {
                method: 'GET',
                url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbol}`,
                params: {modules: 'defaultKeyStatistics,assetProfile'},
                headers: {
                  'x-api-key': apiKey,
                }
              }
              await axios.request(optionsJr).then((res) => {
                const apiResponseJr = res.data.quoteResponse.result;
                if(Array.isArray(apiResponseJr)) {
                  apiResponseJr.forEach(async (stock) => {
                    const displayName = stock['displayName']
                    curCardData.push({id: start_id, stockName: symbol, fullName: displayName})
                    start_id += 1
                    added += 1

                  })
                }
                
              })
              this.setState((state) => {
                return {
                  cardData: curCardData,
                  curStockName: curCardData[0].stockName,
                  sucStockName: curCardData[1].stockName,
                  cardDataLength: this.state.cardDataLength + added

                }
              }, async () => {
                var curOptions = {
                  method: 'GET',
                  url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${this.state.curStockName}`,
                  params: {modules: 'defaultKeyStatistics,assetProfile'},
                  headers: {
                    'x-api-key': apiKey,
                  }
                };
                var sucOptions = {
                  method: 'GET',
                  url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${this.state.sucStockName}`,
                  params: {modules: 'defaultKeyStatistics,assetProfile'},
                  headers: {
                    'x-api-key': apiKey,
                  }
                };
                await axios.request(curOptions).then((response) => {
                    const curAPIResponse = response.data.quoteResponse.result;
                    if(Array.isArray(curAPIResponse)) {
                        curAPIResponse.forEach(async (curStockData) => {
                            await axios.request(sucOptions).then(async (res) => {
                              const sucAPIResponse = res.data.quoteResponse.result;
                              if(Array.isArray(sucAPIResponse)) {
                                  await sucAPIResponse.forEach((sucStockData) => {
                                      this.setState((state) => {
                                        return {
                                            curStockPrice: curStockData['regularMarketPrice'],
                                            curStockDisplayName: curStockData['displayName'],
                                            sucStockPrice: sucStockData['regularMarketPrice'],
                                            sucStockDisplayName: sucStockData['displayName'],
                                          };
                                    }, async () => {
      
                                      var curPicOptions = {
                                        method: 'GET',
                                        url: `https://api.brandfetch.io/v2/brands/${this.state.curStockDisplayName}.com`,
                                        headers: {
                                          Authorization: `Bearer ${brandAPI}`
      
                                        }
                                      };
                                      var sucPicOptions = {
                                        method: 'GET',
                                        url: `https://api.brandfetch.io/v2/brands/${this.state.sucStockDisplayName}.com`,
                                        headers: {
                                          Authorization: `Bearer ${brandAPI}`
      
                                        }
                                      };
                                      await axios.request(curPicOptions).then(async (response) => {
                                        let curStockRes = ""
                                        const curResArray = JSON.parse(JSON.stringify(response)).data.logos[0].formats;
                                        curResArray.forEach(async (curFormat) => {
                                          if(!curFormat.format.includes('svg')) {
                                            curStockRes = curFormat.src
                                          }
      
                                        })
      
                                        await axios.request(sucPicOptions).then(async (res) => {
                                          let sucStockRes = ""
                                          const sucStockArray = JSON.parse(JSON.stringify(res)).data.logos[0].formats;
                                          sucStockArray.forEach(async (sucFormat) => {
                                            if(!sucFormat.format.includes('svg')) {
                                              sucStockRes = sucFormat.src
                                            }
                                          })
                                          this.setState((state) => {
                                            return {
                                              curStockSrc: curStockRes,
                                              sucStockSrc: sucStockRes,
                                              currentIndex: this.state.currentIndex + 1
                                            }
                                          })
                                        })
                                        
                                      })
                                    })
                                  })
                              }
                        }).catch(function (error) {
                            console.error(error);
                        });
                        })
                    }
              }).catch(function (error) {
                  console.error(error);
              });
              })

              
            })
          }
        })

      }catch(err) {
        console.log(err)

      }


    }

     async getStockData() {
        var curOptions = {
            method: 'GET',
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${this.state.curStockName}`,
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'x-api-key': apiKey,
            }
          };
          var sucOptions = {
            method: 'GET',
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${this.state.sucStockName}`,
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'x-api-key': apiKey,
            }
          };
          axios.request(curOptions).then((response) => {
              const curAPIResponse = response.data.quoteResponse.result;
              if(Array.isArray(curAPIResponse)) {
                  curAPIResponse.forEach(curStockData => {
                      axios.request(sucOptions).then((res) => {
                        const sucAPIResponse = res.data.quoteResponse.result;
                        if(Array.isArray(sucAPIResponse)) {
                            sucAPIResponse.forEach(sucStockData => {
                                this.setState((state) => {
                                  return {
                                      curStockPrice: curStockData['regularMarketPrice'],
                                      curStockDisplayName: curStockData['displayName'],
                                      sucStockPrice: sucStockData['regularMarketPrice'],
                                      sucStockDisplayName: sucStockData['displayName'],
                                    };
                              }, () => {

                                var curPicOptions = {
                                  method: 'GET',
                                  url: `https://api.brandfetch.io/v2/brands/${this.state.curStockDisplayName}.com`,
                                  headers: {
                                    Authorization: `Bearer ${brandAPI}`

                                  }
                                };
                                var sucPicOptions = {
                                  method: 'GET',
                                  url: `https://api.brandfetch.io/v2/brands/${this.state.sucStockDisplayName}.com`,
                                  headers: {
                                    Authorization: `Bearer ${brandAPI}`

                                  }
                                };
                                axios.request(curPicOptions).then((response) => {
                                  let curStockRes = ""
                                  const curResArray = JSON.parse(JSON.stringify(response)).data.logos[0].formats;
                                  curResArray.forEach((curFormat) => {
                                    if(!curFormat.format.includes('svg')) {
                                      curStockRes = curFormat.src
                                    }

                                  })

                                  axios.request(sucPicOptions).then((res) => {
                                    let sucStockRes = ""
                                    const sucStockArray = JSON.parse(JSON.stringify(res)).data.logos[0].formats;
                                    sucStockArray.forEach((sucFormat) => {
                                      if(!sucFormat.format.includes('svg')) {
                                        sucStockRes = sucFormat.src
                                      }
                                    })
                                    this.setState((state) => {
                                      return {
                                        curStockSrc: curStockRes,
                                        sucStockSrc: sucStockRes,
                                      }
                                    })
                                  })
                                  
                                })
                              })
                            })
                        }
                  }).catch(function (error) {
                      console.error(error);
                  });
                  })
              }
        }).catch(function (error) {
            console.error(error);
        });
    }

    renderCards = () => {

        return this.state.cardData.map((item, i) => {
    
    
          if (i < this.state.currentIndex) {
            return null
          }
          else if (i == this.state.currentIndex) {
    
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
                    <Image source={{uri: `${this.state.curStockSrc}`}} resizeMode='contain' style={styles.stockCardLogo}></Image>
                </View>
                    <Text style={styles.stockCardName}>{item.fullName}</Text>
                <Text style={styles.stockCardPrice}>${this.state.curStockPrice.toFixed(2)}</Text>
                <View  style={{marginHorizontal:'15%', marginTop: '3%'}}>
                    <StockChart stockName={this.state.curStockName} range={this.state.range} interval={this.state.interval} width={width*.6} height={height*.15}/>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginHorizontal: '15%'}}>
                    <Pressable onPress={() => this.changeRange('1D')} style={this.state.buttonSel == '1D' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1D</Text>
                    </Pressable>
                    <Pressable onPress={() => this.changeRange('1W')} style={this.state.buttonSel == '1W' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1W</Text>
                    </Pressable>
                    <Pressable title={'1M'} onPress={() => this.changeRange('1M')} style={this.state.buttonSel == '1M' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1M</Text>
                    </Pressable>
                    <Pressable title={'3M'} onPress={() => this.changeRange('3M')} style={this.state.buttonSel == '3M' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>3M</Text>
                    </Pressable>
                    <Pressable title={'1Y'} onPress={() => this.changeRange('1Y')} style={this.state.buttonSel == '1Y' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1Y</Text>
                    </Pressable>
                    <Pressable title={'5Y'} onPress={() => this.changeRange('5Y')} style={this.state.buttonSel == '5Y' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>5Y</Text>
                    </Pressable>
                </View>
    
              </Animated.View>
            )
          }
          else {
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
                    <Image source={{uri:`${this.state.sucStockSrc}`}} resizeMode='contain' style={styles.stockCardLogo}></Image>
                </View>
                    <Text style={styles.stockCardName}>{item.fullName}</Text>
                <Text style={styles.stockCardPrice}>${this.state.sucStockPrice.toFixed(2)}</Text>
                <View  style={{marginHorizontal:'15%', marginTop: '3%'}}>
                    <StockChart stockName={this.state.sucStockName} range={this.state.range} interval={this.state.interval} width={width*.6} height={height*.15}/>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginHorizontal: '15%'}}>
                    <Pressable onPress={() => this.changeRange('1D')} style={this.state.buttonSel == '1D' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1D</Text>
                    </Pressable>
                    <Pressable onPress={() => this.changeRange('1W')} style={this.state.buttonSel == '1W' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1W</Text>
                    </Pressable>
                    <Pressable title={'1M'} onPress={() => this.changeRange('1M')} style={this.state.buttonSel == '1M' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1M</Text>
                    </Pressable>
                    <Pressable title={'3M'} onPress={() => this.changeRange('3M')} style={this.state.buttonSel == '3M' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>3M</Text>
                    </Pressable>
                    <Pressable title={'1Y'} onPress={() => this.changeRange('1Y')} style={this.state.buttonSel == '1Y' ? styles.button_sel:styles.button_unSel}>
                        <Text style={styles.button_text}>1Y</Text>
                    </Pressable>
                    <Pressable title={'5Y'} onPress={() => this.changeRange('5Y')} style={this.state.buttonSel == '5Y' ? styles.button_sel:styles.button_unSel}>
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
            <View style={{flex:1}}>
              {this.renderCards()}
            </View>
            <View style={{ height: 60 }}>
            </View>
          </View>
        )

    }
}