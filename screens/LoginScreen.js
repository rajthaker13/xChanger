import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView, Input } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Video } from 'expo-av';
import { styles } from '../Styles'
import { AmplifyTheme } from '../AmplifyTheme';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import { Storage } from "@aws-amplify/storage"

const initialLoginForm = { username: '', password: '' }

function LoginScreen({ navigation }) {

    /*
    function onPress() {
        navigation.navigate('HomeScreen');
    }
    */

    const [loginForm, setLoginForm] = useState(initialLoginForm)

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

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

    function onChange(e) {
        e.persist()
        setLoginForm(() => ({ ...loginForm, [e.target.name]: e.target.value }))
    }

    async function signIn() {
        try {
            const { username, password } = loginForm
            await Auth.signIn(username, password);
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
                <TextInput style={{ styling }} name="username" onChange={onChange} placeholder="username"></TextInput>
                <TextInput style={{ styling }} name="password" type="password" onChange={onChange} placeholder="password" secureTextEntry={true}></TextInput>
                <Button onClick={async () => { signIn() }} title="Log In"></Button>
            </SafeAreaView>
        </View>
    );
}

export default LoginScreen;