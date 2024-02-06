import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {DarkTextLarge, DarkTextMedium, MainContainer} from '../components/StyledComponent';
import {globalStyles, width} from '../utils/Style';
import DatePicker from '../components/DatePicker';
import CustomDropdown from '../components/CustomDropdown';
import CustomTextInput from '../components/CustomTextInput';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import CameraComponent from '../components/CameraComponent';

const documents = [
  {
    name: 'Registration and Fitness',
    subfeilds: [
      {
        placeholder: 'Manufacturing Date',
        name: 'manufacturing_date',
        type: 'date',
        elements: [],
        value: '2023-12-14 11:47',
      },
      {
        placeholder: 'Registration Date',
        name: 'registration_date',
        type: 'date',
        elements: [],
        value: '2023-12-14 11:47',
      },
      {
        placeholder: 'Kilometer Driven',
        name: 'km_driven',
        type: 'text',
        elements: [],
        value: '12 km',
      },
      {
        placeholder: 'RTO',
        name: 'rto',
        type: 'text',
        elements: [],
        value: 'Do',
      },
      {
        placeholder: 'Ownership',
        name: 'ownership',
        type: 'dropdown',
        elements: [
          '1st Owner',
          '2nd Owner',
          '3rd Owner',
          '4th Owner',
          '5th Owner',
          '6th Owner',
        ],
        value: '3rd Owner',
      },
      {
        placeholder: 'Registration Number',
        name: 'registration_number',
        type: 'text',
        elements: [],
        value: 'Tu',
      },
      {
        placeholder: 'Fitness Upto',
        name: 'fitness_upto',
        type: 'date',
        elements: [],
        value: '2023-12-15 11:47',
      },
      {
        placeholder: 'CNG/LPG fitment in RC',
        name: 'cng_lpg_fitment',
        type: 'dropdown',
        elements: ['Available', 'Not Available'],
        value: 'Available',
      },
      {
        placeholder: 'Varient',
        name: 'varient',
        type: 'text',
        elements: [],
        value: 'Tu',
      },
      {
        placeholder: 'RC Availiblity',
        name: 'rc_availibility',
        type: 'dropdown',
        elements: ['Orignal Condition', 'Not Ok', 'Ok', 'Rc Lost', 'Duplicate'],
        value: 'Not Ok',
      },
      {
        placeholder: 'RC Image',
        name: 'rc_image',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/94781702534847.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/33611702536152.jpg',
        ],
      },
      {
        placeholder: 'Mismatch In RC',
        name: 'mismatched_in_rc',
        type: 'dropdown',
        elements: ['No Mismatch', 'Mismatch'],
        value: 'No Mismatch',
      },
      {
        placeholder: 'Rto Noc Issued ',
        name: 'rto_noc_issued',
        type: 'dropdown',
        elements: ['Yes', 'No'],
        value: 'Yes',
      },
      {
        placeholder: 'RTO NOC issued ? ',
        name: 'rto_noc',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/89971702534847.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/76831702534847.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/80361702536152.jpg',
        ],
      },
      {
        placeholder: 'Insurance Availiblity',
        name: 'insaurance_availibility',
        type: 'dropdown',
        elements: ['Available', 'Not Available'],
        value: 'Not Available',
      },
      {
        placeholder: 'Insurance Availiblity Condition',
        name: 'insaurance_availibility_condition',
        type: 'dropdown',
        elements: ['Comprehensive', 'Third Party', 'Zero Dept', 'Expired'],
        value: 'Third Party',
      },
      {
        placeholder: 'Insurance image if available',
        name: 'insaurance_image',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/39631702534849.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/30981702536154.jpg',
        ],
      },
      {
        placeholder: 'Under Hyphothication ',
        name: 'hyphothication',
        type: 'dropdown',
        elements: ['Yes', 'No'],
        value: 'Yes',
      },
      {
        placeholder: 'Loan Status  ',
        name: 'loan_status',
        type: 'dropdown',
        elements: ['Open', 'Closed'],
        value: 'Open',
      },
      {
        placeholder: 'If Loan Closed',
        name: 'loan_closed',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/32091702534847.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/40491702536153.jpg',
        ],
      },
      {
        placeholder: 'Road Tax Paid status',
        name: 'road_tax_status',
        type: 'dropdown',
        elements: ['OTT/LTT', 'Limited'],
        value: 'OTT/LTT',
      },
      {
        placeholder: 'Partipeshi Request',
        name: 'partipeshi_request',
        type: 'dropdown',
        elements: ['Yes(For 100 Days)', 'Not Required'],
        value: 'Yes(For 100 Days)',
      },
      {
        placeholder: 'Structural damage',
        name: 'structural_damage',
        type: 'dropdown',
        elements: ['Structural damage', 'No Structural damage'],
        value: 'No Structural damage',
      },
      {
        placeholder: 'Car Type',
        name: 'car_type',
        type: 'dropdown',
        elements: ['Luxury', 'Normal', 'Scrap'],
        value: 'Luxury',
      },
      {
        placeholder: 'Engine Rating',
        name: 'engine_rating',
        type: 'dropdown',
        elements: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
        value: '1.5',
      },
      {
        placeholder: 'Chasis number embossingg',
        name: 'chassis_number',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok', 'Rusted', 'Not Tracesable'],
        value: 'Not Ok',
      },
      {
        placeholder: 'Duplicate Key',
        name: 'duplicate_key',
        type: 'dropdown',
        elements: ['No', 'Yes'],
        value: 'No',
      },
      {
        placeholder: 'Duplicate Key Image',
        name: 'duplicate_key_image',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/13291702534848.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/61771702536153.jpg',
        ],
      },
    ],
  },
  {
    name: 'Main Photos',
    subfeilds: [
      {
        placeholder: 'Front Main',
        name: 'front_main',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/19051702534848.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/42001702536153.jpg',
        ],
      },
      {
        placeholder: 'Front  Left ',
        name: 'front_left',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/44351702534848.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/45191702536153.jpg',
        ],
      },
      {
        placeholder: 'Rear Main',
        name: 'rear_main',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/87481702534848.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/74201702534848.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/25891702536154.jpg',
        ],
      },
      {
        placeholder: 'Rear Right',
        name: 'rear_right',
        type: 'file',
        elements: [],
        value: [
          'https://crm.unificars.com/uploads/inpectedImages/26311702534848.jpg',
          'https://crm.unificars.com/uploads/inpectedImages/91241702536154.jpg',
        ],
      },
    ],
  },
];

const renderInnerFlatList = ({item}) => (
  <FlatList
    data={item.subfeilds}
    keyExtractor={(innerItem, index) => index.toString()} // Use index as the key
    ListHeaderComponent={() => (
      <MainContainer style={{}}>
        <DarkTextLarge>{item.name}</DarkTextLarge>
      </MainContainer>
    )}
    renderItem={({item, index}) => (
      <View style={{flex: 1, backgroundColor: 'trasparent'}} key={index}>
        {item.type == 'text' ? (
          <CustomTextInput onInputChange={() => {}} fields={item} />
        ) : item.type == 'dropdown' ? (
          <CustomDropdown onInputChange={() => {}} fields={item} />
        ) : item.type == 'date' ? (
          <DatePicker onInputChange={() => {}} fields={item} />
        ) : item.type == 'multipleselect' ? (
          <MultiSelectDropdown onInputChange={() => {}} fields={item} />
        ) : item.type == 'file' ? (
          <CameraComponent deletePhoto={() => {}} fields={item} />
        ) : item.type == 'video' ? (
          <CameraComponent mediaType={'video'} fields={item} />
        ) : item.type == 'textarea' ? (
          <CustomTextInput fields={item} isTextArea={true} />
        ) : (
          <></>
        )}
      </View>
    )}
  />
);

export default function Documents() {
  return (
    <MainContainer>
      <FlatList
        data={documents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item,index})=>(
            <TouchableOpacity style={[{backgroundColor:'red',marginHorizontal:5,marginVertical:10},globalStyles.flexBox]}>
                <DarkTextMedium style={{color:'whie'}}>{item.name}</DarkTextMedium>
            </TouchableOpacity>
        )}
        horizontal={true}
      />
      <FlatList
        data={documents}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        renderItem={({item, index}) => (
          <View
            style={{width: width, backgroundColor: 'transparent'}}
            key={index}>
            {renderInnerFlatList({item})}
          </View>
        )}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
