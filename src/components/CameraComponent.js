import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';

const CameraComponent = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const cameraRef = useRef(null);

  const [isPhotoMode, setIsPhotoMode] = useState(true);

  if (!hasPermission) {
    return (
      <View>
        <Text>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  const handleCapturePhoto = async () => {
    try {
      console.log("agya")
      const photo = await cameraRef.current.takePhoto();
      // Handle the captured photo, you can display it, save it, etc.
      console.log('Captured photo:', photo);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  return (
    <View style={{flex:1}}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={isPhotoMode}
        onInitialized={() => {
          
        }}
        onError={(error) => {
          console.error('Camera error:', error);
        }}
      />
      <TouchableOpacity style={{width:400,height:700}} onPress={handleCapturePhoto}>
        <Text>Capture Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraComponent;
