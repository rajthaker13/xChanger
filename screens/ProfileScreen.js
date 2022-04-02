import * as React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import Background from '../components/Background';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../Styles';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePicture from '../components/profile/ProfilePicture';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileLevel from '../components/profile/ProfileLevel';
import ProfilePortfolio from '../components/ProfilePortfolio';

export default function ProfileScreen() {
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
      <ScrollView directionalLockEnabled={true}>
          <ProfileHeader/>
          <ProfilePicture/>
          <ProfileStats/>
          <ProfileLevel/>
          <View style={styles.profilePortfolioHeader}>
              <Text style={styles.profilePortfolioHeaderText}>My Portfolio</Text>
              <View style={styles.profilePortfolioViewAllContainer}>
                  <Button title="View All" color="white"></Button>
              </View>
            </View>
          <ProfilePortfolio/>
      </ScrollView>
      </LinearGradient>
    );
  }