import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {InspectionDetails, CustomDropdown} from '../../export';
import {globalStyles, width} from '../utils/Style';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import {Container, MainContainer} from '../components/StyledComponent';
import CustomTextInput from '../components/CustomTextInput';
import DatePicker from '../components/DatePicker';
import DetailsChild from '../components/DetailsChild';
import {ScrollView} from 'react-native-gesture-handler';
import { documentsForm } from '../services/Api';
import { useSelector } from 'react-redux';

export default function Step_1() {
  const wizobj = useSelector((state) => state.global.wizardObj);
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
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true)
  console.log("wij =>",wizobj)

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await documentsForm({leadId:21});
      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log('data =>', response.data.data.data);
        setData(response.data.data.data);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>

      <FlatList
        style={{paddingHorizontal: 10, paddingBottom: 20}}
        ListHeaderComponent={() => <InspectionDetails />}
        data={data}
        renderItem={({ item }) => (
            <DetailsChild data={item[wizobj.currentStep]} />
        )}        
        keyExtractor={(item, index) => index.toString()}
      />
      
    </SafeAreaView>
  );
}
