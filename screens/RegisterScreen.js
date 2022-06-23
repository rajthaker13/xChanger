import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView, Input } from 'react-native'
import { Video } from 'expo-av';
import { styles } from '../Styles'
import { AmplifyTheme } from '../AmplifyTheme';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-picker';
import { Storage } from "@aws-amplify/storage"


const initialFormInputState = {
  username: '', password: '', name: '', familyname: '', phone: '', picture: '', birthday: '', code: ''
}

const initialFormState = {
  formType: 'signUp'
}

function RegisterScreen() {
  //STATES
  const [formInputState, setFormInputState] = useState(initialFormInputState)
  const [date, setDate] = useState(new Date())
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
          setFormInputState(() => ({ ...formInputState }))
          break;
      }
    });
  }

  //onChange Handler (Update formState)
  function onChange(e) {
    e.persist()
    setFormInputState(() => ({ ...formInputState, [e.target.name]: e.target.value }))
  }

  async function signUp() {
    try {
      const { username, password, name, familyname, phone, birthday, picture } = formInputState;
      await Auth.signUp({
        username,
        password,
        attributes: {
          name,
          familyname,
          phone,
          birthday,
          picture
        }
      });
      setFormState(() => ({ ...formState, formType: "confirmSignUp" }))
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp() {
    try {
      const { username, code } = formInputState;
      await Auth.confirmSignUp(username, code);
      //insert router to login screen
    } catch (error) {
      console.log('Error Confirming Sign Up', error);
    }
  }

  async function pickImage() {
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

  //VIDEO
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

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
          <SafeAreaView style={{ backgroundColor: "white", alignContent: "center", alignItems: "center" }}>
            <TextInput styles={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }} name="username" onChange={onChange} placeholder="username"></TextInput>
            <TextInput styles={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }} name="password" type="password" onChange={onChange} placeholder="password"></TextInput>
            <TextInput styles={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }} name="name" onChange={onChange} placeholder="First Name"></TextInput>
            <TextInput styles={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }} name="familyname" onChange={onChange} placeholder="Last name"></TextInput>
            <TextInput styles={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }} name="phone" onChange={onChange} placeholder="Phone Number"></TextInput>

            <Button onClick={async () => { pickImage() }} title="Select Profile Picture"></Button>
            <Button onClick={async () => { signUp() }} title="Register"></Button>
          </SafeAreaView>
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
    </View>
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



