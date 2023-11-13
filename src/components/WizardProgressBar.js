// WizardProgressBar.js

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME_COLOR, globalStyles, width } from '../utils/Style';
import { FadeTextSmall } from './StyledComponent';

const WizardProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ind,setIndex] = useState(0);
  const [item,setItem] = useState([
    {
      name:'Documents',
      icon:'file'
    },
    {
      name:'Exterior',
      icon:'car-lifted-pickup'
    },
    {
      name:'Interior',
      icon:'car-seat-cooler'
    },
    {
      name:'Engine',
      icon:'engine'
    },
    {
      name:'Other',
      icon:'car-cog'
    },
  ])

  const handleStepPress = (step) => {
    setCurrentStep(step);
  };

  const renderSteps = () => {
    const steps = 5; // Number of steps
    const stepWidth = 30;
    const stepMargin = 10;

    return item.map((val, index) =>{
      const isCurrent = index <= currentStep;
      const stepStyle = isCurrent ? styles.filledStep : styles.emptyStep;

      return (
        <View key={index} style={[globalStyles.rowContainer,globalStyles.flexBox]}>
          <View style={[{backgroundColor:'transparent',width:30,},globalStyles.flexBox]}>
          <TouchableOpacity
            style={[styles.step, stepStyle,{backgroundColor: index <= currentStep ? THEME_COLOR:'#cfd9fa'}]}
            onPress={() => {handleStepPress(index),setIndex(index)}}
          >
            <Text style={[styles.stepText,{color:index <= currentStep ? 'white':THEME_COLOR}]}>{index + 1}</Text>
          </TouchableOpacity>
          </View>
          <FadeTextSmall style={{width:60,position:'absolute',bottom:-20,left:-12,textAlign:'center',color:index <= currentStep ? THEME_COLOR:'grey' }}>{val.name}</FadeTextSmall>
          {index != steps - 1 ?
          <View style={[styles.line, { width:40,backgroundColor:index <= currentStep-1 ? THEME_COLOR:'#cfd9fa'}]} />:<></>
    }
        </View>
      );
  })
  };

  return (
    <View style={styles.container}>
      {/* <View style={[styles.line, { width: width - 50,position:'absolute',top:25 }]} /> */}
      {/* <View style={[styles.line, { width: (60 + 10) * currentStep,position:'absolute',top:25,left:20,backgroundColor:THEME_COLOR }]} /> */}
      <View style={styles.stepsContainer}>{renderSteps()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  line: {
    height: 5,
    backgroundColor: 'grey',
  },
  stepsContainer: {
    // justifyContent:'space-around',
    flexDirection: 'row',
    marginTop: 10,
    width:'100%',
    // backgroundColor:'red'
  },
  stepContainer: {
    alignItems: 'center',
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledStep: {
    backgroundColor: THEME_COLOR,
  },
  emptyStep: {
    backgroundColor: 'transparent',
  },
  stepText: {
    color:  '#fff',
    fontWeight: 'bold',
  },
});

export default WizardProgressBar;
