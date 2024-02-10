import {StyleSheet, Text, View} from 'react-native';
import React, {createContext} from 'react';
import CustomTextInput from './CustomTextInput';
import CustomDropdown from './CustomDropdown';
import DatePicker from './DatePicker';
import MultiSelectDropdown from './MultiSelectDropdown';
import CameraComponent from './CameraComponent';
import {FlatList} from 'react-native-gesture-handler';
import {DarkTextLarge, StyledButton} from './StyledComponent';
import {globalStyles, height, width} from '../utils/Style';
import Test from './Test';

const InnerFlatListContext = createContext();
export default function InnerFlatlist({item,isDocument}) {
  const updateFromValues = (type, val) => {
    console.log(type,' =>',val);
  };

  const renderComponent = item => {
    switch (item.type) {
      case 'text':
        return <CustomTextInput onInputChange={() => {}} fields={item} />;
      case 'dropdown':
        return <CustomDropdown onInputChange={() => {}} fields={item} />;
      case 'date':
        return <DatePicker onInputChange={() => {}} fields={item} />;
      case 'multipleselect':
        return <MultiSelectDropdown onInputChange={() => {}} fields={item} />;
      case 'file':
        return <CameraComponent deletePhoto={() => {}} fields={item} />;
      case 'video':
        return <CameraComponent mediaType={'video'} fields={item} />;
      case 'textarea':
        return <CustomTextInput fields={item} isTextArea={true} />;
      default:
        return null;
    }
  };

  return (
    <InnerFlatListContext.Provider value={updateFromValues}>
      <FlatList
        style={{backgroundColor: 'transparent', height: height - (isDocument ? 430:270)}}
        data={item.subfeilds}
        keyExtractor={(innerItem, index) => index.toString()}
        ListHeaderComponent={() => (
          <View style={styles.innerHeader}>
            <DarkTextLarge>{item.name}</DarkTextLarge>
          </View>
        )}
        ListFooterComponent={() => (
           <View style={{width:width,backgroundColor:'transparent' ,...globalStyles.flexBox}}> 
          <StyledButton style={[globalStyles.flexBox]} onPress={()=>{}}>
            <DarkTextLarge style={{color: 'white'}}>Submit</DarkTextLarge>
          </StyledButton>
          </View>
        )}
        renderItem={({item, index}) => (
          <View style={styles.innerItem}>{renderComponent(item)}</View>
        )}
      />
    </InnerFlatListContext.Provider>
  );
}
export {InnerFlatListContext};

const styles = StyleSheet.create({
  innerHeader: {
    backgroundColor: '',
    width: width,
    height: 50,
    ...globalStyles.flexBox,
  },
  innerItem: {
    backgroundColor: 'transparent',
  },
});
