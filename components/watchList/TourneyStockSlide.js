import React, {useEffect} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../global';
import axios from 'axios'

export default class TourneyStockSlide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            src: '',
            fullName: props.fullName,
            stockName: props.stockName,
            invested: props.invested,
            totalInvested: props.totalInvested,
        }
    }

    async componentDidMount() {
        let domain = ''
        let curSrc = ''
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
              Authorization: `Bearer ${brandAPI}`

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
          this.setState((state) => {
              return {
                  src: curSrc
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
              <Text style={styles.watchListStockInfo}>Invested: {this.state.invested}k/{this.state.totalInvested}k</Text>
              <TouchableOpacity style={styles.watchListEditButton}>
                   <Text style={styles.watchListEditButtonText}>EDIT</Text>
              </TouchableOpacity>
            </View>
        )

        }
}