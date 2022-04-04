<<<<<<< HEAD
import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Image, Button, Pressable, Animated, Dimensions, PanResponder} from 'react-native';
=======
import React, {useEffect, useState} from 'react';
import {Text, View, Image, Button, Pressable, Animated} from 'react-native';
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607
import {styles} from '../../Styles';
import axios from 'axios'
import '../../global';
import StockChart from '../StockChart';
<<<<<<< HEAD



const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const cardData = [
    {id:'1', src:require('../../assets/images/apple.png'),fullName:'Apple Inc. (AAPL)', stockName:'AAPL'}, 
    {id:'2', src:require('../../assets/images/tesla.jpeg'),stockName:'TSLA',fullName:'Tesla Inc (TSLA)', }, 
    {id:'3', src:require('../../assets/images/abc.png'),stockName:'GOOG',fullName:'Alphabet Inc (GOOG)', },
    {id:'4', src:require('../../assets/images/apple.png'),fullName:'Apple Inc. (AAPL)', stockName:'AAPL'}, 
    {id:'5', src:require('../../assets/images/tesla.jpeg'),stockName:'TSLA',fullName:'Tesla Inc (TSLA)', }, 
    {id:'6', src:require('../../assets/images/abc.png'),stockName:'GOOG',fullName:'Alphabet Inc (GOOG)', }
]
export default class StockCard extends React.Component {
    constructor(props) {
        super(props)
        this.position = new Animated.ValueXY()
        this.state = {
          currentIndex: 0,
          curStockName:cardData[0].stockName,
          sucStockName:cardData[1].stockName, 
          curStockPrice: 0.00,
          sucStockPrice: 0.00,
          range: '1d',
          interval: '15m',
          buttonSel:'1D',
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
        this.getStockPrices()
        
    }
    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({
    
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onPanResponderMove: (evt, gestureState) => {
    
            this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
          },
          onPanResponderRelease: (evt, gestureState) => {
    
            if (gestureState.dx > 120) {
              Animated.spring(this.position, {
                toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
              }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                  this.position.setValue({ x: 0, y: 0 })
                  const newSuc = cardData[this.state.currentIndex + 1].stockName
                  this.setState({
                      curStockName: this.state.sucStockName,
                      sucStockName: newSuc
                  }, () => {
                    this.getStockPrices()
                  })
                  
                })
              })
              this.getStockPrices()
            }
            else if (gestureState.dx < -120) {
              Animated.spring(this.position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
              }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                  this.position.setValue({ x: 0, y: 0 })
                  const newSuc = cardData[this.state.currentIndex + 1].stockName
                  this.setState({
                    curStockName: this.state.sucStockName,
                    sucStockName: newSuc
                }, () => {
                    this.getStockPrices()

                })
                })
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
=======
import Swipeable from 'react-native-gesture-handler';


export default function StockCard() {
    const [stockName, setStockName] = useState('AAPL');
    const [price, setPrice] = useState(0.00);
    const[range, setRange] = useState('1d');
    const[interval,setInterval] = useState('15m');
    const[buttonSel, setButtonSel] = useState('1D');
    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <RectButton style={styles.leftAction} onPress={this.close}>
            <Animated.Text
              style={[
                styles.actionText,
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              Archive
            </Animated.Text>
          </RectButton>
        );
      };

    function changeRange(newRange) {
        setButtonSel(newRange);
        if(newRange == '1D') {
            setRange('1d');
            setInterval('15m');
        }
        else if(newRange == '1W') {
            setRange('5d');
            setInterval('15m');
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607


        }
        else if(newRange == '1M') {
<<<<<<< HEAD
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
=======
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
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607

        }
    }

<<<<<<< HEAD
     getStockPrices() {
        var curOptions = {
            method: 'GET',
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${this.state.curStockName}`,
=======
    function getStockPrice() {
        var options = {
            method: 'GET',
            url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockName}`,
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'x-api-key': apiKey,
            }
          };
<<<<<<< HEAD
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
                                      sucStockPrice: sucStockData['regularMarketPrice'],
                                    };
                              })
                            })
                        }
                  }).catch(function (error) {
                      console.error(error);
                  });
=======
          axios.request(options).then(function (response) {
              const apiResponse = response.data.quoteResponse.result;
              if(Array.isArray(apiResponse)) {
                  apiResponse.forEach(stockData => {
                      setPrice(stockData['regularMarketPrice'])
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607
                  })
              }
        }).catch(function (error) {
            console.error(error);
        });
    }
<<<<<<< HEAD
    renderCards = () => {

        return cardData.map((item, i) => {
    
    
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
                    <Image source={item.src} resizeMode='contain' style={styles.stockCardLogo}></Image>
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
                    <Image source={item.src} resizeMode='contain' style={styles.stockCardLogo}></Image>
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
=======

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
        <Swipeable renderLeftActions={this.renderLeftActions}>
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
        </Swipeable>
    )
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607
}