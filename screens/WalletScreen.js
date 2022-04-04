import * as React from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import '../global';
import {styles} from '../Styles'
import Background from '../components/Background';
import WalletHeader from '../components/wallet/WalletHeader';
import WalletChart from '../components/wallet/WalletChart';
import WalletTournamentHistory from '../components/wallet/WalletTournamentHistory';
import ProfilePortfolio from '../components/ProfilePortfolio'
export default function WalletScreen() {
    return (
      <LinearGradient 
      colors={['#18FE04', '#121111']} 
      start={{
      x: 0,
      y: 0
      }}
      end={{
      x: 1,
      y: 1
      }} 
      style={styles.background}>
        <ScrollView>
          <WalletHeader/>
          <WalletChart/>
          <WalletTournamentHistory/>
          <View style={{marginTop:height * .02}}>
<<<<<<< HEAD
            <ProfilePortfolio tradesArray={[['UWMC', 'SPCE']]}/>
=======
            <ProfilePortfolio/>
>>>>>>> f910b918a3db3b758fe26264ebdb2fb9e482e607
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }