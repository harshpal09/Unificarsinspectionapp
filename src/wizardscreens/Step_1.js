import {StyleSheet, Text, View, TouchableOpacity,SafeAreaView, FlatList} from 'react-native';
import React, {useState} from 'react';
import {InspectionDetails, CustomDropdown} from '../../export';
import {globalStyles, width} from '../utils/Style';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import {Container, MainContainer} from '../components/StyledComponent';
import CustomTextInput from '../components/CustomTextInput';
import DatePicker from '../components/DatePicker';
import DetailsChild from '../components/DetailsChild';
import {ScrollView} from 'react-native-gesture-handler';


export default function Step_1() {
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
  const data = [
    {
      name: 'Fitness And Registration',
      icon: 'file',
    },
    {
      name: 'Car Documents',
      icon: 'file',
    },
 

    
  ];
  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
        style={{paddingHorizontal:10,paddingBottom:20}}
        ListHeaderComponent={() => <InspectionDetails />}
        data={data}
        renderItem={item => (
            <DetailsChild item={item.item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
   </SafeAreaView>
  );
}
