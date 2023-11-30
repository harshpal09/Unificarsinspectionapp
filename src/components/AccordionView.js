import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import {
  LIGHT_BLUE,
  THEME_COLOR,
  globalStyles,
  width,
} from '../utils/Style';
import {
  CustomDropdown,
  CustomTextInput,
  DatePicker,
  MultiSelectDropdown,
} from '../../export';
import { Container, DarkTextMedium } from './StyledComponent';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import CameraComponent from './CameraComponent';

const AccordionView = ({ title, fields, expanded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (image, text) => {
    setSelectedImage(image);
    setSelectedText(text);
    setModalVisible(!isModalVisible);
  };
  console.log('fields',fields)

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return <CustomTextInput placeholder={field.placeholder} />;
      case 'dropdown':
        return <CustomDropdown placeholder={field.placeholder} data={field.elements} />;
      case 'date':
        return <DatePicker title={field.placeholder} />;
      case 'multipleselect':
      return <MultiSelectDropdown placeholder={field.placeholder} data={field.elements} />;
      // Add more cases for other types
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.flexBoxJustify,
        {
          borderWidth: expanded ? 1 : 0,
          borderTopWidth: 0,
          borderColor: 'lightgrey',
  
        },
      ]}
    >
      {expanded && (
        <Container >
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              {renderField(field)}
            </React.Fragment>
          ))}
          <View style={[{paddingTop: 10,width:'90%'}]}>
            <TouchableOpacity
              style={[
                {
                  width: '100%',
                  // padding:10,
                  height: 30,
                  backgroundColor: THEME_COLOR,
                  borderRadius: 10,
                },
                globalStyles.flexBox,
              ]}
              onPress={()=>{}}
              >
              <DarkTextMedium style={{color:'white',}}>Submit</DarkTextMedium>
            </TouchableOpacity>
          </View>
        </Container>
      )}
    </SafeAreaView>
  );
};

export default AccordionView;
