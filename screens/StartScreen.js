import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Dimensions, Button, KeyboardAvoidingView, Image, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../Styles';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import '../global';
import { Video } from 'expo-av';


export default function StartScreen({ navigation }) {
    function openRegister() {
        navigation.navigate('RegisterScreen');
    }
    function openLogin() {
        navigation.navigate('LoginScreen');
    }
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View>
            <Video
                ref={video}
                style={styles.backgroundVideo}
                source={require('../assets/videos/playbackvideo.mp4')}
                resizeMode="cover"
                isLooping={true}
                shouldPlay={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.start_screen_wrapper}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.start_screen_logo} source={require('../assets/images/XChanger.png')} resizeMode='contain' width={75} height={75}></Image>
                    <Text style={styles.start_screen_logo_text}>Changer</Text>
                </View>
                <Text style={styles.start_screen_title}>Join our investing community</Text>
                <Text style={styles.start_screen_description_text}>With a revolutionary way to invest right here, right now</Text>
                <View style={styles.start_screen_button_wrapper}>
                    <Fragment>
                        <TouchableHighlight style={styles.start_screen_styled_button_normal} onPress={openRegister}>
                            <Text style={styles.start_screen_styled_title_normal}>Create Account</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.start_screen_styled_button_transparent} onPress={openLogin}>
                            <Text style={styles.start_screen_styled_title_transparent}>Log In</Text>
                        </TouchableHighlight>
                    </Fragment>

                </View>

            </View>
        </View>
    );
}