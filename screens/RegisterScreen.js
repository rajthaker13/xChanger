import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView, Input } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Video } from 'expo-av';
import { styles } from '../Styles'
import { AmplifyTheme } from '../AmplifyTheme';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-picker';
import { Storage } from "@aws-amplify/storage"

//INITIAL FORMS
const initialLoginForm = { code: '' }
const initialUsername = { username: '' }
const initialPassword = { password: '' }
const initialName = { name: '' }
const initialFamilyName = { familyname: '' }
const initialPhoneNumber = { phone: '' }
const initialProfilePicture = { picture: '' }
const initialFormState = { formType: 'signUp' }
const initialPreferredUsername = { preferredUsername: '' }

function RegisterScreen({ navigation }) {
  //STATES
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [usernameForm, setUsernameForm] = useState(initialUsername)
  const [passwordForm, setPasswordForm] = useState(initialPassword)
  const [nameForm, setNameForm] = useState(initialName)
  const [familyNameForm, setFamilyNameForm] = useState(initialFamilyName)
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture)
  const [preferredUsername, setPreferredUsername] = useState(initialPreferredUsername)

  //Birthday
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  //FormType
  const [formState, setFormState] = useState(initialFormState)

  //User State
  const [user, updateUser] = useState(null)

  //UseEffect ??(Figure out why)
  useEffect(() => {
    //checkUser()
    setAuthListener()
  }, [])

  async function onChange() {

  }

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signOut':
          console.log('user signed out');
          console.log('data from event: ', data)
          //setFormState(...setFormState,)
          break;
      }
    });
  }

  //DATE HANDLER
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  //AUTH FUNCTIONS
  async function signUp() {
    try {
      await Auth.signUp({
        username: usernameForm,
        password: passwordForm,
        attributes: {
          name: nameForm,
          family_name: familyNameForm,
          phone_number: phoneNumber,
          birthdate: date.toISOString().substring(0, 10),
          preferred_username: preferredUsername,
          picture: ''
        }
      });
      setFormState(() => ({ ...formState, formType: "confirmSignUp" }))
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function debug() {
    console.log(usernameForm)
    console.log(passwordForm)
    console.log(nameForm)
    console.log(familyNameForm)
    console.log(date)
  }

  async function confirmSignUp() {
    try {
      console.log(loginForm)
      await Auth.confirmSignUp(usernameForm, loginForm);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error Confirming Sign Up', error);
    }
  }

  //SET PROFILE PICTURE

  //DATEPICKER
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  //VIDEO
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});


  const styling = StyleSheet.create({
    text: {
      borderColor: "gray"
    }
  })

  //BACK
  async function returnHome() {
    navigation.navigate('StartScreen')
  }

  return (

    <View className="Register">
      <Video
        ref={video}
        style={styles.backgroundVideo}
        source={require('../assets/videos/playbackvideo.mp4')}
        resizeMode="cover"
        isLooping={true}
        shouldPlay={true}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {
        formState.formType === 'signUp' && (
          <View style={{
            padding: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
            <SafeAreaView style={{ backgroundColor: "white", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <TextInput name="username" onChangeText={(val) => setUsernameForm(val)} placeholder="username"></TextInput>
              <TextInput name="password" type="password" onChangeText={(val) => setPasswordForm(val)} placeholder="password" secureTextEntry={true}></TextInput>
              <TextInput name="name" onChangeText={(val) => setNameForm(val)} placeholder="First Name"></TextInput>
              <TextInput name="familyname" onChangeText={(val) => setFamilyNameForm(val)} placeholder="Last name"></TextInput>
              <TextInput name="phone" onChangeText={(val) => setPhoneNumber(val)} placeholder="Phone Number"></TextInput>
              <TextInput name="preferred_username" onChangeText={(val) => setPreferredUsername(val)} placeholder="Preferred Username"></TextInput>
              <View>
                <View>
                  <Button onPress={showDatepicker} title="Birthday" />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeDate}
                  />
                )}
              </View>
              <Button onPress={async () => { signUp() }} title="Register"></Button>
              <Button onPress={async () => { debug() }} title="Debug"></Button>
              <Button onPress={async () => { returnHome() }} title="Back"></Button>
            </SafeAreaView >
          </View >
        )
      }
      {
        formState.formType === 'confirmSignUp' && (
          <SafeAreaView style={{ backgroundColor: "white", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <View>
              <TextInput name="code" onChangeText={(val) => setLoginForm(val)} placeholder="Confirmation Code"></TextInput>
              <Button onPress={async () => { confirmSignUp() }} title="Complete SignUp"></Button>
            </View>
          </SafeAreaView>
        )
      }
      {
        formState.formType === 'setProfilePicture' && (
          <View></View>
        )
      }
    </View >
  );
}

export default RegisterScreen;

/*
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
/*
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
*/



