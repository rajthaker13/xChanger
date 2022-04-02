import * as React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {styles} from '../../Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function Posts() {
    return (
        <View>
        <View style={{width: width * .96, marginLeft: width * .02}}>
            <View style={styles.hubPostHeader}>
                <View style={styles.hubPostProfilePic}>
                    <Image source={require('../../assets/images/girlProfile.jpeg')} style={styles.profilePicImage}></Image>
                </View>
                <Text style={styles.profileNamePost}>maryjoe</Text>
                <View style={styles.levelContainerPost}>
                    <Text style={styles.levelTextPost}>Level 30</Text>
                </View>
                <View style={{marginLeft: width * .3}}>
                    <Entypo name='dots-three-horizontal' size={25} color='white'/>
                </View>
            </View>
            <View style={styles.hubPost}>
                <Image source={require('../../assets/images/igPost.jpeg')} style={styles.hubPostImage}></Image>
                <View style={{flexDirection:'row', marginTop: height * .025, marginLeft: width * .02}}>
                    <IonIcons name='heart-outline' size={40} color='white'/>
                    <IonIcons name='chatbubbles-outline' size={40} color='white' style={{marginLeft:width*.01}}/>
                    <IonIcons name='share-social-outline' size={40} color='white' style={{marginLeft:width*.01}}/>
                    <IonIcons name='bookmark-outline' size={40} color='white' style={{marginLeft:width*.5}}/>
                </View>
                <View style={{flexDirection:'row', marginTop: height * .005, marginLeft: width * .02}}>
                    <View style={styles.hubPostProfilePicSmall}>
                        <Image source={require('../../assets/images/XChanger.png')} style={styles.profilePicImage}></Image>
                    </View>
                    <Text style={styles.hubPostLikedByText}>Liked by</Text>
                    <Text style={styles.hubPostLikedByTextBold}>xchangerinvesting</Text>
                    <Text style={styles.hubPostLikedByText}>and</Text>
                    <Text style={styles.hubPostLikedByTextBold}>420 others</Text>
                </View>
                <View style={{marginLeft: width * .05, flexDirection: 'row'}}>
                    <Text style={styles.hubPostLikedByTextBold}>maryjoe</Text>
                    <View style={{marginLeft: width * .01, width: width * .8}}>
                        <Text style={styles.hubPostLikedByText}>I've been a regular Tesla investor for 2 years and have been nothing but satisfied with their results!</Text>
                    </View>
                </View>
                <View style={styles.commentPostHeader}>
                    <View style={styles.hubPostProfilePicMedium}>
                        <Image source={require('../../assets/images/joesmith.jpeg')} style={styles.profilePicImage}></Image>
                    </View>
                    <Text style={styles.addCommentTextPost}>Add a comment...</Text>
                </View>
                <Text style={styles.postTimeText}>2 hours ago</Text>
            </View>
        </View>
                <View style={{width: width * .96, marginLeft: width * .02}}>
                <View style={styles.hubPostHeader}>
                    <View style={styles.hubPostProfilePic}>
                        <Image source={require('../../assets/images/XChanger.png')} style={styles.profilePicImage}></Image>
                    </View>
                    <Text style={styles.profileNamePost}>xchangerinvesting</Text>
                    <View style={styles.levelContainerPost}>
                        <Text style={styles.levelTextPost}>Level 100</Text>
                    </View>
                    <View style={{marginLeft: width * .3}}>
                        <Entypo name='dots-three-horizontal' size={25} color='white'/>
                    </View>
                </View>
                <View style={styles.hubPost}>
                    <Image source={require('../../assets/images/mockUp.png')} style={styles.hubPostImage}></Image>
                    <View style={{flexDirection:'row', marginTop: height * .025, marginLeft: width * .02}}>
                        <IonIcons name='heart-outline' size={40} color='white'/>
                        <IonIcons name='chatbubbles-outline' size={40} color='white' style={{marginLeft:width*.01}}/>
                        <IonIcons name='share-social-outline' size={40} color='white' style={{marginLeft:width*.01}}/>
                        <IonIcons name='bookmark-outline' size={40} color='white' style={{marginLeft:width*.5}}/>
                    </View>
                    <View style={{flexDirection:'row', marginTop: height * .005, marginLeft: width * .02}}>
                        <View style={styles.hubPostProfilePicSmall}>
                            <Image source={require('../../assets/images/girlProfile.jpeg')} style={styles.profilePicImage}></Image>
                        </View>
                        <Text style={styles.hubPostLikedByText}>Liked by</Text>
                        <Text style={styles.hubPostLikedByTextBold}>maryjoe</Text>
                        <Text style={styles.hubPostLikedByText}>and</Text>
                        <Text style={styles.hubPostLikedByTextBold}>200,483 others</Text>
                    </View>
                    <View style={{marginLeft: width * .05, flexDirection: 'row', width: width * .6}}>
                        <Text style={styles.hubPostLikedByTextBold}>xchangerinvesting</Text>
                        <View style={{marginLeft: width * .01}}>
                            <Text style={styles.hubPostLikedByText}>Welcome to XChanger!</Text>
                        </View>
                    </View>
                    <View style={styles.commentPostHeader}>
                        <View style={styles.hubPostProfilePicMedium}>
                            <Image source={require('../../assets/images/joesmith.jpeg')} style={styles.profilePicImage}></Image>
                        </View>
                        <Text style={styles.addCommentTextPost}>Add a comment...</Text>
                    </View>
                    <Text style={styles.postTimeText}>5 hours ago</Text>
                </View>
            </View>
            </View>
    )
}