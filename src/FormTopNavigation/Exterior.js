import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {DarkTextLarge, DarkTextMedium, MainContainer} from '../components/StyledComponent';
import {THEME_COLOR, globalStyles, width} from '../utils/Style';
import DatePicker from '../components/DatePicker';
import CustomDropdown from '../components/CustomDropdown';
import CustomTextInput from '../components/CustomTextInput';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import CameraComponent from '../components/CameraComponent';

const documents = [
  {
    name: 'Bumper',
    subfeilds: [
      {
        placeholder: 'Bumper ',
        name: 'bumper_front_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Bumper Conditon',
        name: 'bumper_front_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Dented',
          'Faded',
          'Ok',
          'Repainted',
          'Repaired',
          'Replaced',
          'Scratched',
        ],
        value: '',
      },
      {
        placeholder: 'Bumber Image',
        name: 'front_bumper',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Windshield',
    subfeilds: [
      {
        placeholder: 'Status ',
        name: 'windshield_front_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Windshield Conditon',
        name: 'windshield_front_condition',
        type: 'multipleselect',
        elements: ['Broken', 'Ok', 'Replaced', 'Scratched', 'Spot'],
        value: '',
      },
      {
        placeholder: 'Windshield Image',
        name: 'windshield_front',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Bonnet',
    subfeilds: [
      {
        placeholder: 'Bonnet Subpart ',
        name: 'boonet_subpart_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Bonnet Conditon',
        name: 'boonet_subpart_condition',
        type: 'multipleselect',
        elements: [
          'Damage',
          'Dented',
          'Faded',
          'Ok',
          'Repainted',
          'Repaired',
          'Replaced',
          'Rusting',
          'Scratched',
        ],
        value: '',
      },
      {
        placeholder: 'Bonnet Image',
        name: 'bonet_hood',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Headlight',
    subfeilds: [
      {
        placeholder: 'LHS Headlight Status',
        name: 'light_lhs_headlight_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'LHS Headlight Condition',
        name: 'light_lhs_headlight_condition',
        type: 'multipleselect',
        elements: [
          'Scratched',
          'Rusting',
          'Replaced',
          'Repaired',
          'Ok',
          'NA',
          'Dented',
          'Damaged',
          'Broken',
        ],
        value: '',
      },
      {
        placeholder: 'RHS Headlight Status',
        name: 'light_rhs_headlight_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'RHS Headlight Condtition',
        name: 'light_rhs_headlight_condition',
        type: 'multipleselect',
        elements: [
          'Scratched',
          'Rusting',
          'Replaced',
          'Repaired',
          'Ok',
          'NA',
          'Dented',
          'Damaged',
          'Broken',
        ],
        value: '',
      },
      {
        placeholder: 'LHS Fog Light',
        name: 'light_lhs_fog_light_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'RHS Fog Light',
        name: 'light_rhs_fog_light_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'LHS Headlight Image',
        name: 'lhs_headlight',
        type: 'file',
        elements: [],
        value: [],
      },
      {
        placeholder: 'RHS Headlight Image',
        name: 'rhs_headlight',
        type: 'file',
        elements: [],
        value: [],
      },
      {
        placeholder: 'LHS Fog Light Image',
        name: 'lhs_fog',
        type: 'file',
        elements: [],
        value: [],
      },
      {
        placeholder: 'RHS Fog Light Image',
        name: 'rhs_fog',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Upper Cross Member(Bonnet Patti)',
    subfeilds: [
      {
        placeholder: 'Upper Cross Member(Bonnet Patti) status',
        name: 'upper_cross_member_boonet_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'upper_cross_member_boonet_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
          'Dented',
        ],
        value: '',
      },
      {
        placeholder: 'Image',
        name: 'upper_cross_member',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Lower Cross Member',
    subfeilds: [
      {
        placeholder: 'Status',
        name: 'lower_cross_member_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'lower_cross_member_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'Image',
        name: 'lower_cross_member',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Radiator Support',
    subfeilds: [
      {
        placeholder: 'Status',
        name: 'radiator_support_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'radiator_support_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'Image',
        name: 'radiator_support',
        type: 'file',
        elements: [],
        value: '',
      },
    ],
  },
  {
    name: 'Cowl Top',
    subfeilds: [
      {
        placeholder: 'Status',
        name: 'cowl_top_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'cowl_top_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'Image',
        name: 'cowl_top',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Firewall',
    subfeilds: [
      {
        placeholder: 'Status',
        name: 'firewall_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'firewall_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'Image',
        name: 'firewall',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Roof',
    subfeilds: [
      {
        placeholder: 'Subpart',
        name: 'roof_subpart_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'roof_subpart_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
          'Dented',
          'Scratched',
        ],
        value: '',
      },
      {
        placeholder: 'Image',
        name: 'roof',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Appron',
    subfeilds: [
      {
        placeholder: 'LHS',
        name: 'lhs_appron_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'LHS Condition',
        name: 'lhs_appron_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'RHS',
        name: 'rhs_appron_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'RHS Condition',
        name: 'rhs_appron_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'LHS Image',
        name: 'lhs_appron',
        type: 'file',
        elements: [],
        value: [],
      },
      {
        placeholder: 'RHS Image',
        name: 'rhs_appron',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Appron Legs',
    subfeilds: [
      {
        placeholder: 'LHS',
        name: 'lhs_appron_leg_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'LHS Condition',
        name: 'lhs_appron_leg_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'RHS',
        name: 'rhs_appron_leg_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'RHS Condition',
        name: 'rhs_appron_leg_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: 'LHS Image',
        name: 'lhs_appron_leg',
        type: 'file',
        elements: [],
        value: [],
      },
      {
        placeholder: 'RHS Image',
        name: 'rhs_appron_leg',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Head Light Support',
    subfeilds: [
      {
        placeholder: 'Status',
        name: 'head_light_support_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: ' Condition',
        name: 'radiator_support_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
      {
        placeholder: ' Image',
        name: 'headlight_support',
        type: 'file',
        elements: [],
        value: [],
      },
    ],
  },
  {
    name: 'Wiper',
    subfeilds: [
      {
        placeholder: 'Status',
        name: 'wiper_front_status',
        type: 'dropdown',
        elements: ['Ok', 'Not Ok'],
        value: '',
      },
      {
        placeholder: 'Condition',
        name: 'wiper_front_condition',
        type: 'multipleselect',
        elements: [
          'Damaged',
          'Ok',
          'Repainted',
          'Replaced',
          'Repaired',
          'Rusting',
        ],
        value: '',
      },
    ],
  },
];

const renderInnerFlatList = ({item}) => (
  <FlatList
    onLayout={(e)=> console.log('vertical of set =>',e.nativeEvent.layout.height)}
    data={item.subfeilds}
    keyExtractor={(innerItem, index) => index.toString()} // Use index as the key
    ListHeaderComponent={() => (
      <View style={{}}>
        <DarkTextLarge>{item.name}</DarkTextLarge>
      </View>
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

export default function Exterior() {
  return (
    <MainContainer>
      <FlatList
        scrollEventThrottle={1}
        onScroll={(e)=>{console.log(e.nativeEvent.contentOffset.x)}}
        style={{backgroundColor:'lightgray'}}
        data={documents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              {backgroundColor: THEME_COLOR,padding:10,height:40, marginHorizontal: 5, marginVertical: 15,borderRadius:15},
              globalStyles.flexBox,
            ]}>
            <DarkTextMedium style={{color: 'white'}}>{item.name}</DarkTextMedium>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
