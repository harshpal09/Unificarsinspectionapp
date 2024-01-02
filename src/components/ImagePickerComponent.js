import React from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerComponent = () => {
  const [imageSource, setImageSource] = React.useState(null);

  const pickImageWithCrop = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImageSource({ uri: image.path });
    });
  };

  return (
    <View>
      {imageSource && <Image source={imageSource} style={{ width: 200, height: 200 }} />}
      <Button title="Pick Image with Crop" onPress={pickImageWithCrop} />
    </View>
  );
};

export default ImagePickerComponent;
