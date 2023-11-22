import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME_COLOR, globalStyles, width } from '../utils/Style';
import { FadeTextSmall } from './StyledComponent';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setWizardCurrentStep } from '../../redux/features/GlobalSlice';

const WizardProgressBar = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wizobj = useSelector((state) => state.global.wizardObj);

  const [currentStep, setCurrentStep] = useState(0);
  const [ind, setIndex] = useState(0);
  const [item, setItem] = useState([
    {
      name: 'Documents',
      icon: 'file',
    },
    {
      name: 'Exterior',
      icon: 'car-lifted-pickup',
    },
    {
      name: 'Interior',
      icon: 'car-seat-cooler',
    },
    {
      name: 'Engine',
      icon: 'engine',
    },
    {
      name: 'Other',
      icon: 'car-cog',
    },
  ]);

  useEffect(() => {
    // Update header back button dynamically
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal:10}} onPress={() => navigation.replace('tab')}>
          <Ionicons name={'chevron-back'} color="white" size={25} />
        </TouchableOpacity>
      ),
    });
  }, [currentStep, wizobj]);

  const handleStepPress = (step) => {
    setCurrentStep(step);
    setIndex(step);
    let obj = { ...wizobj };
    obj.currentStep = step;
    obj.index = step;
    dispatch(setWizardCurrentStep(obj));
    navigation && 
     navigation.navigate(`Step_${step + 1}`,);
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Your component content */}
      <View style={styles.stepsContainer}>{renderSteps()}</View>
    </View>
  );

  function renderSteps() {
    const steps = 5; // Number of steps

    return item.map((val, index) => {
      const isCurrent = index <= currentStep;
      const stepStyle = isCurrent ? styles.filledStep : styles.emptyStep;

      return (
        <View key={index} style={[globalStyles.rowContainer, globalStyles.flexBox]}>
          <View style={[{ backgroundColor: 'transparent', width: 30 }, globalStyles.flexBox]}>
            <TouchableOpacity
              style={[styles.step, stepStyle, { backgroundColor: index <= wizobj.currentStep ? THEME_COLOR : '#cfd9fa' }]}
              onPress={() => handleStepPress(index)}
            >
              <Text style={[styles.stepText, { color: index <= wizobj.currentStep ? 'white' : THEME_COLOR }]}>{index + 1}</Text>
            </TouchableOpacity>
          </View>
          <FadeTextSmall style={{ width: 60, position: 'absolute', bottom: -20, left: -12, textAlign: 'center', color: index <= wizobj.currentStep ? THEME_COLOR : 'grey' }}>
            {val.name}
          </FadeTextSmall>
          {index !== steps - 1 ? <View style={[styles.line, { width: 40, backgroundColor: index <= wizobj.currentStep - 1 ? THEME_COLOR : '#cfd9fa' }]} /> : <></>}
        </View>
      );
    });
  }
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
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
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
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WizardProgressBar;
