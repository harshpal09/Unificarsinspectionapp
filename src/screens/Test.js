import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

export default function Test() {
  const [mediaUri, setMediaUri] = useState(null);

  const openCamera = async (mediaType) => {
    try {
      let options = {
        cropping: true,
        mediaType: mediaType,
      };

      const result = await ImagePicker.openCamera(options);

      // Check if the user canceled the operation
      if (result && result.path) {
        setMediaUri(result.path);

        // Convert the captured media to base64
        if (result.mime.startsWith('image')) {
          convertImageToBase64(result.path);
        } else if (result.mime.startsWith('video')) {
          convertVideoToBase64(result.path);
        }
      } else {
        console.log('User canceled image selection or video recording.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openImagePicker = async () => {
    try {
      let options = {
        cropping: true,
      };

      const result = await ImagePicker.openPicker(options);

      // Check if the user canceled the operation
      if (result && result.path) {
        setMediaUri(result.path);

        // Convert the selected image to base64
        if (result.mime.startsWith('image')) {
          convertImageToBase64(result.path);
        }
      } else {
        console.log('User canceled image selection.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertImageToBase64 = async (filePath) => {
    try {
      const base64 = await RNFS.readFile(filePath, 'base64');
      console.log('Image Base64:', base64);
    } catch (error) {
      console.log(error);
    }
  };

  const convertVideoToBase64 = async (filePath) => {
    try {
      const base64 = await RNFS.readFile(filePath, 'base64');
      console.log('Video Base64:', base64);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Test</Text>
      <Button title="Open Image Picker" onPress={openImagePicker} />
      <Button title="Open Camera for Image" onPress={() => openCamera('photo')} />
      <Button title="Open Camera for Video" onPress={() => openCamera('video')} />

      {mediaUri && mediaUri.endsWith('.mp4') ? (
        <Video source={{ uri: mediaUri }} style={{ width: 300, height: 300 }} />
      ) : (
        <Image source={{ uri: mediaUri }} style={{ width: 300, height: 300 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
