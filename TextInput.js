import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import {styles} from './Styles';

export default function TextInput({ errorText, description, ...props }) {
    return (
      <View style={styles.textInputContainer}>
        <Input
          style={styles.input}
          selectionColor='#560CCE'
          underlineColor="transparent"
          mode="outlined"
          {...props}
        />
        {description && !errorText ? (
          <Text style={styles.textInputDescription}>{description}</Text>
        ) : null}
        {errorText ? <Text style={styles.textInputError}>{errorText}</Text> : null}
      </View>
    )
  }