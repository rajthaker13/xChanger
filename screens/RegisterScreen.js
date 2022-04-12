import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
// import { Text } from 'react-native-paper'
// import Button from '../Button'
// import TextInput from '../TextInput'
// import BackButton from '../BackButton'
// import {emailValidator} from '../helpers/emailValidator'
// import {passwordValidator} from '../helpers/passwordValidator'
// import {nameValidator} from '../helpers/nameValidator'
import { Video } from 'expo-av';
import {styles} from '../Styles'
import {AmplifyTheme} from '../AmplifyTheme';
import { withAuthenticator } from 'aws-amplify-react-native';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";


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

  return (
    <AmplifyAuthenticator usernameAlias='preferred_username'>
          <AmplifySignIn
          headerText="Sign In Header"
          slot="sign-in" />
          <AmplifySignUp headerText="Sign Up Header"
          formFields={[
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
          ]}
          slot="sign-up" />

    </AmplifyAuthenticator>
  )
}
export default withAuthenticator(RegisterScreen);

