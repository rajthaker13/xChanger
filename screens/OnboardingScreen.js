import React, { Component, useState, useEffect, PropTypes } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native'
import { COLORS, SIZES } from '../assets/onboarding/constants';
import quizData from '../assets/onboarding/onboardingData';
//import MultipleChoice from 'react-native-multiple-choice';
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import Storage from "@aws-amplify/storage";
import { components } from '@aws-amplify/ui-react';

export default function OnboardingScreen({ navigation }) {
  const allQuestions = quizData;
  const [onGoing, setOnGoing] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionsSelected, setOptionsSelected] = useState('');
  const [multipleOptionSelected, setMultipleOptionSelected] = useState([]);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false)

  //PROGRESS
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%']
  })

  //INITIALIZE USERVARIABLES JSON
  const userVar = {};
  const variables = {};
  const quiz = [];
  userVar.variables = variables;
  userVar.variables.quiz = quiz;

  const renderProgressBar = () => {
    return (
      <View style={{
        width: '100%',
        height: 20,
        borderRadius: 20,
        backgroundColor: '#00000020',
      }}>
        <Animated.View style={[{
          height: 20,
          borderRadius: 20,
          backgroundColor: COLORS.accent
        }, {
          width: progressAnim
        }]}>
        </Animated.View>
      </View>
    )
  }

  //answerChoices = [];

  const uploadQuiz = (filename, file) => {
    Auth.currentCredentials();
    return Storage.put(filename, file, {
      level: "private",
      contentType: "application/json",
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const finishQuiz = () => {
    //uploadQuiz("onboardingData.json", userVar);
    console.log(userVar);
    console.log(quiz);
    console.log("QUIZ IS FINISHED");
  }

  //RENDER QUIZ
  const renderQuestion = () => {
    return (
      <View style={{ marginVertical: 40 }}>
        {/*Question Counter*/}
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end'
        }}>
          <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
          <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
        </View>

        {/* Question */}
        <Text style={{
          color: COLORS.white,
          fontSize: 30
        }}>{allQuestions[currentQuestionIndex]?.question}</Text>
      </View>
    )
  }

  const handleClick = (selectedOption) => {
    console.log(userVar)
    setShowNextButton(true)
  }

  const setMCQ = (selected) => {
    if (multipleOptionSelected.includes(selected)) {
      setMultipleOptionSelected(current => current.filter(multipleOptionSelected => { return !selected }))
    }
    else {
      setMultipleOptionSelected(current => [...current, selected])
      console.log("Selected: " + selected)
      console.log("MCQ: " + multipleOptionSelected)
    }
    setShowNextButton(true)
  }

  const renderOption = () => {
    const multipleChoice = allQuestions[currentQuestionIndex].multipleChoice;
    return (
      <View>
        {multipleChoice == false
          ? allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => { setOptionsSelected(option), handleClick(option) }}
              key={option}
              style={{
                borderWidth: 3,
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10,
                backgroundColor: option == optionsSelected ? COLORS.selected : COLORS.unselected
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>
            </TouchableOpacity>
          ))
          : allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => { setMCQ(option), handleClick(option) }}
              key={option}
              style={{
                borderWidth: 3,
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10,
                backgroundColor: option == multipleOptionSelected.includes(option) ? COLORS.selected : COLORS.unselected
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  //NEXT RENDER/BUTTON
  const handleNext = () => {
    if (allQuestions[currentQuestionIndex].multipleChoice == true) {
      //const answer = {$currentQuestionIndex: };
      quiz.push(multipleOptionSelected)
      setMultipleOptionSelected([])
    }
    else {
      quiz.push(optionsSelected)
      setOptionsSelected('')
    }
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      //QUIZ COMPLETED
      finishQuiz();
      //navigation.navigate('HomeScreen')i
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
          }}>
          <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView style={{
        flex: 1,

        paddingVertical: 40,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
        position: 'relative'
      }}>
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOption()}

        {/* Next Button */}
        {renderNextButton()}
      </ScrollView>
    </SafeAreaView>
  );
}