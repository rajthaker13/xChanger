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
            console.log("username: " + username)
            console.log("password: " + password)
            console.log("loginUser: " + loginUser)
            console.log("loginPassword: " + loginPassword)
            await Auth.signIn(loginUser, loginPassword);
            //CHECK USER VARIABLES
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function returnHome() {
        navigation.navigate('StartScreen')
    }

    //USER VARIABLE CHECK
    async function fetchUserVar() {
        const file = await Storage.get("userVariables.json", {
            level: "private"
        })
        loginPathway(file);
    }

    async function loginPathway(file) {
        if (file.hasOnboarded == false) {
            navigation.navigate('OnboardingScreen');
        }
        else {
            navigation.navigate('HomeScreen');
        }
    }

    return (
        <View>
            <SafeAreaView style={{ backgroundColor: "white", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <Video
                    ref={video}
                    style={styles.backgroundVideo}
                    source={require('../assets/videos/playbackvideo.mp4')}
                    resizeMode="cover"
                    isLooping={true}
                    shouldPlay={true}
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                <View style={LoginCard.container}>
                    <View style={LoginCard.card}>
                        <TextInput name="username" onChangeText={(val) => setLoginUser(val)} placeholder="Username" placeholderTextColor="#FFFFFF" style={LoginCard.textInput} autoCorrect={false}></TextInput>
                        <TextInput name="password" type="password" onChangeText={(val) => setLoginPassword(val)} placeholder="Password" placeholderTextColor="#FFFFFF" secureTextEntry={true} style={LoginCard.textInput} autoCorrect={false}></TextInput>
                        <Button onPress={async () => { signIn() }} style={LoginCard.btn} title="Log In"></Button>
                        <Button onPress={async () => { returnHome() }} style={LoginCard.btn} title="Back"></Button>
                    </View>
                </View>
            </SafeAreaView>
        </View >
    );
}

const LoginCard = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        alignItems: 'center', // Centered horizontally
        padding: 125
    },
    card: {
        height: 250,
        width: 200,
        backgroundColor: '#202020',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        borderRadius: 15,
        borderColor: '#6495ED',
        borderWidth: 3
    },
    textInput: {
        borderColor: '#6495ED',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'white',
        margin: 15,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#6495ED',
        color: '#6495ED'
    }
});

export default LoginScreen;