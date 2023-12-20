import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { width } from '../utils/Style';

const TimerComponent = ({ isRecording, onClose }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if (isRecording) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      {/* <Text style={styles.stopText} onPress={onClose}>
        Stop Recording
      </Text> */}
    </View>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
  return formattedTime;
};

const padNumber = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

const styles = StyleSheet.create({
  container: {
    
    position: 'absolute',
    bottom: 120,
    right: (width-50)/2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    padding: 5,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
  },
  stopText: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
});

export default TimerComponent;
