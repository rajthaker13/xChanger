import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView, Input } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Video } from 'expo-av';
import { styles } from '../Styles'
import { AmplifyTheme } from '../AmplifyTheme';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import { Storage } from "@aws-amplify/storage"
import { NavigationContainerRefContext } from '@react-navigation/native';

const initialLoginUser = { username: '' }
const initialLoginPassword = { password: '' }

function LoginScreen({ navigation }) {
    const [loginUser, setLoginUser] = useState(initialLoginUser)
    const [loginPassword, setLoginPassword] = useState(initialLoginPassword)

    //VIDEO BACKGROUND
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    //HUB LISTENER
    async function setAuthListener() {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signOut':
                    console.log('user signed out');
                    console.log('data from event: ', data)
                    setFormInputState(() => ({ ...formInputState }))
                    break;
            }
        });
    }

    //ONCHANGE HANDLER
    function onChange(e) {
        e.persist()
        setLoginForm(() => ({ ...loginForm, [e.target.name]: e.target.value }))
    }

    //AUTH SIGNIN
    async function signIn() {
        try {
            const { username } = loginUser;
            const { password } = loginPassword;
            await Auth.signIn(username, password);
            console.log("logged in?")
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.log('error signing in', error);
        }
    }

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
            <SafeAreaView style={{ backgroundColor: "white", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <TextInput style={{}} name="username" onChange={(val) => setLoginUser(val)} placeholder="username"></TextInput>
                <TextInput style={{}} name="password" type="password" onChange={(val => setLoginPassword(val))} placeholder="password" secureTextEntry={true}></TextInput>
                <Button onPress={async () => { signIn() }} title="Log In"></Button>
            </SafeAreaView>
        </View>
    );
}

export default LoginScreen;