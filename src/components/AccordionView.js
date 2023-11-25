import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { LIGHT_BLUE, globalStyles, width } from '../utils/Style';
import {CustomDropdown,CustomTextInput,DatePicker,MultiSelectDropdown} from '../../export'
import { Container } from './StyledComponent';


export default AccordionView = ({ title, content, expanded, }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (image,text) => {
    setSelectedImage(image);
    setSelectedText(text);
    setModalVisible(!isModalVisible);

    
  }

  return (
    <SafeAreaView style={[globalStyles.flexBoxJustify, { borderWidth: expanded  == true ? 1 : 0, borderTopWidth:0,borderColor:"lightgrey"}]}>
      {expanded && (
          <Container >
            <CustomTextInput placeholder={'Registration Number'} />
            {/* <CustomTextInput placeholder={'Kilometer Driven'} /> */}
            <CustomTextInput placeholder={'RTO'} />
            <CustomTextInput placeholder={'Varient'} />
            {/* <CustomDropdown  placeholder={'Ownership'} data={['1st owener','2nd owener','3rd owener','4th owener','5th owener','6th owener','7th owener',]} /> */}
            <MultiSelectDropdown placeholder={'Status'} data={["Damaged","Faded","Ok","Repaired","Replaced","Repainted","Dented","Scratched"]}/>
            <DatePicker title={'Manufacturing Date'} />
            <DatePicker title={'Registration Date'} />
            <DatePicker title={'Fitness Upto'} />
          </Container>
      )}
    </SafeAreaView>
  );
};


