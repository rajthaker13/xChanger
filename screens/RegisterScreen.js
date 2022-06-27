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


const initialLoginForm = {
  username: '', password: '', name: '', familyname: '', code: ''
}

const initialPhoneNumber = {
  phone: ''
}

const initialProfilePicture = {
  picture: ''
}

const initialFormState = {
  formType: 'signUp'
}

function RegisterScreen() {
  //STATES
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture)

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

  //onChange Handler (Update formState)
  function onChange(e) {
    console.log("changes are being made")
    e.persist()
    setLoginForm(() => ({ ...loginForm, [e.target.name]: e.target.value }))
  }

  function onChangePhone(e) {
    e.persist()
    setPhoneNumber(() => ({ ...phoneNumber, [e.target.name]: e.target.value }))
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  //AUTH FUNCTIONS
  async function signUp() {
    try {
      const { username, password, name, familyname } = loginForm;
      const { phone } = phoneNumber;
      //const { picture } = profilePicture;
      const { birthday } = date;

      console.log(loginForm)
      console.log(phoneNumber)

      await Auth.signUp({
        username,
        password,
        attributes: {
          name,
          familyname,
          phone,
          birthday
        }
      });
      setFormState(() => ({ ...formState, formType: "confirmSignUp" }))
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp() {
    try {
      const { username, code } = loginForm;
      await Auth.confirmSignUp(username, code);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error Confirming Sign Up', error);
    }
  }

  //SET PROFILE PICTURE
  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

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
              <TextInput style={{ styling }} name="username" onChange={onChange} placeholder="username"></TextInput>
              <TextInput style={{ styling }} name="password" type="password" onChange={onChange} placeholder="password" secureTextEntry={true}></TextInput>
              <TextInput style={{ styling }} name="name" onChange={onChange} placeholder="First Name"></TextInput>
              <TextInput style={{ styling }} name="familyname" onChange={onChange} placeholder="Last name"></TextInput>
              <TextInput styles={{ styling }} name="phone" onChange={onChangePhone} placeholder="Phone Number"></TextInput>
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
            </SafeAreaView >
          </View >
        )
      }
      {
        formState.formType === 'confirmSignUp' && (
          <View>
            <Input name="code" onChange={onChange} placeholder="Confirmation Code"></Input>
            <Button onClick={async () => { confirmSignUp() }} title="Complete SignUp"></Button>
          </View>
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



