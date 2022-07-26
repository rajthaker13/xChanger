import React, { Component, useState, PropTypes } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native'
import { COLORS, SIZES } from '../assets/onboarding/constants';
import quizData from '../assets/onboarding/onboardingData';
//import MultipleChoice from 'react-native-multiple-choice';
import Amplify, { API, Auth, Hub, graphqlOperation } from 'aws-amplify';
import Storage from "@aws-amplify/storage";

export default function OnboardingScreen({ navigation }) {
  const allQuestions = quizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionsSelected, setOptionsSelected] = useState(['']);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(false);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false)

  //PROGRESS
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%']
  })

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

  const storeAnswer = (question, answer) => {
    setOptionsSelected(...optionsSelected, answer);
    console.log("Option selected: " + optionsSelected);
    /*
    const jsonData = { "question": question, "answer": answer };
    userVar.quiz.push(JSON.stringify(jsonData));
    console.log("JSON: " + jsonData)
    console.log("QUIZ INPUT: " + JSON.stringify(userVar))
    let optionsArray = [];
    const answerChoices = allQuestions[currentQuestionIndex].options;
    const options = Object.keys(answerChoices);
    options.forEach(function (options) {
      optionsArray.push(options)
    })
    console.log("Options: " + optionsArray);
    setShowNextButton(true)
    */
  }

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
    uploadQuiz("onboardingData.json", userVar);
    console.log(quiz)
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

  //STORE QUIZ DATA
  const userVar = {};
  const quiz = [];
  userVar.quiz = quiz;

  const handleClick = () => {
    //make it so that its a boolean true if pressed if not pressed before (you dont know whether its been pressed before)
    //make it so that its boolean false if pressed but was before
  }

  const renderOption = () => {
    /*
    let optionsArray = [];
    const answerChoices = allQuestions[currentQuestionIndex].options;
    const options = Object.keys(answerChoices);
    options.forEach(function (options) {
      optionsArray.push(options)
    })
    */
    const multipleChoice = allQuestions[currentQuestionIndex].multipleChoice;
    return (
      <View>
        {multipleChoice
          ? allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => storeAnswer(allQuestions[currentQuestionIndex], option)}
              key={option}
              selected={currentOptionSelected}
              style={{
                borderWidth: 3,
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>
            </TouchableOpacity>
          ))
          : allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => storeAnswer(allQuestions[currentQuestionIndex], option)}
              selected={optionsSelected}
              key={option}
              style={{
                borderWidth: 3,
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10
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
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      //QUIZ COMPLETED
      finishQuiz();
      //navigation.navigate('HomeScreen')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
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