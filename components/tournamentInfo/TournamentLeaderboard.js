import {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
export default function TournamentLeaderboard({numUsers, maxUsers}) {
    function getRandomInt() {
        return Math.floor(Math.random() * (10000 - 5)) + 4;
      }
      const [profiles, setProfiles] = useState([])
      useEffect(() => {
        axios.get(`https://randomuser.me/api/?results=${numUsers}`).then((response) => {
            console.log(response.data.results)
            setProfiles(response.data.results)
        })

      }, [])
    return (
        <View>
        <Text style={styles.tournamentInfoLeaderboardHeader}>Leaderboard</Text>
        <View style={styles.tournamentInfoLeaderboard}>
            {profiles.map((profile, index) => {
                return (
                    <View style={styles.tournamentInfoLeaderboardSlide}>
                        <Text style={styles.tournamentInfoLeaderboardSlideRank}>{index + 1}</Text>
                        <View style={styles.tournamentLeaderboardProfilePic}> 
                            <Image source={{uri: profile.picture.thumbnail}} resizeMode='contain' style={styles.profilePicImage}></Image>
                        </View>
                        <Text style={styles.tournamentLeaderboardName}>{profile.login.username}</Text>
                        <Ionicons name='md-chevron-forward-sharp' color='white' size={35}/>
                    </View>
                )
            })}

        </View>
        </View>
    )
}