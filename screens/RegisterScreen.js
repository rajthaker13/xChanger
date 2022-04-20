import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native'
import { Video } from 'expo-av';
import {styles} from '../Styles'
import {AmplifyTheme} from '../AmplifyTheme';
import { withAuthenticator } from 'aws-amplify-react-native';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import {Auth} from 'aws-amplify';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { Storage } from "@aws-amplify/storage"

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'PhoneNumber',
      key: 'phone_number',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 4,
      type: 'string'
    },
    {
      label: 'Birthdate',
      type: 'datetime',
      key: 'birthdate',
      required: true,
      displayOrder: 6
    },
  ]

}
const usernameAttributes = 'My user name';

 const RegisterScreen = ({navigation}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthdate, setBirthdate] = useState(new Date())
  const [gender, setGender] = useState('')
  const [name, setName] = useState('')
  const [picture, setPicture] = useState(null)
  const genders = ["Male", "Female", "Other"]
  const [openDateModal, setOpenDateModal] = useState(false)
  let formInputState = { username: '', password: '', email: '', birthdate: '', gender: '', name: '', picture: '', verificationCode: '' };

  function onChange(e) {
    formInputState = { ...formInputState, [e.target.name]: e.target.value };
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPicture(result.uri);
    }
  };

  async function signUp() {
    try {
      const userBday = birthdate.toISOString().split('T')[0]
      const response = await fetch(picture)
      console.log(response.blob())
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          birthdate: userBday,
          gender: gender,
          name: name,
          picture: picture,
        }});
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    } catch (err) { console.log({ err }); }
  }

function changeBday(event,date) {
  setBirthdate(date)
}

  return (
    <SafeAreaView>
    <TextInput
      name="username"
      onChangeText={setEmail}
      style={styles.input}
      value={email}
      placeholder="Email"
    />
    <TextInput
      name="password"
      value={password}
      onChangeText={setPassword}
      style={styles.input}
      placeholder="Password"
    />
    <RNDateTimePicker 
        value={birthdate} 
        onChange={changeBday}
        />
    <SelectDropdown 
            data={genders} 
            buttonStyle={{backgroundColor:'grey', borderRadius: 20}} 
            onSelect={(selectedItem, index) => {
                setGender(selectedItem)
            }}
    />
    <Button title="Pick an Image from Camera Roll" onPress={pickImage} />
    <Button onPress={signUp} title='Sign Up'/>
  </SafeAreaView>
  )
}
export default RegisterScreen;

