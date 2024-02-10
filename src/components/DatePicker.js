import React, { useState ,useEffect, useContext} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { LIGHT_BLUE, THEME_COLOR, globalStyles, width } from '../utils/Style';
import { LightThemeColorTextMedium } from './StyledComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../redux/features/GlobalSlice';
import { InnerFlatListContext } from './InnerFlatList';

export default function DatePicker({fields,onInputChange}) {
  const [value, setValue] = useState(dayjs());
  const [placeholder,setPlaceHolder] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selected_value,setSelectedValue] = useState(fields.value);
  const updateFromValues = useContext(InnerFlatListContext);

    const api_send_data = useSelector(state => state.global.formData);
  const dispatch = useDispatch();
  

  const handlePressOutside = () => {
    setOpenDatePicker(false);
    Keyboard.dismiss();
  };
  // console.log(fields.name,'date api data  ->',api_send_data);
  const handleInputChange = (text) => {
    setSelectedValue(text);
    // onInputChange(text,fields);
    // console.log(fields.name," =>",fields.value)
    if(typeof updateFromValues == 'function'){
      updateFromValues(fields.type,value)
    }
    setSelectedValue(value);
    
  };
  useEffect(() => {
    
    if(fields.value == "") return;

    handleInputChange(fields.value)
  }, [fields.value])
  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={[styles.container,{width:width},globalStyles.flexBox]}>
        <View
          style={[
            globalStyles.flexBox,
            { backgroundColor: 'transparent', width: '90%', paddingVertical: 10 },
          ]}>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              padding: 10,
              borderRadius: 10,
              borderColor: selected_value == ''? 'red':THEME_COLOR,
              borderWidth: 1,
              fontWeight: '500',
            }}
            onPress={()=> setOpenDatePicker(!openDatePicker)}
            ><LightThemeColorTextMedium style={{color :selected_value == ''? 'red':THEME_COLOR}}>{placeholder || fields.value || fields.placeholder}</LightThemeColorTextMedium></TouchableOpacity>
        
        </View>
        {openDatePicker && (
          <DateTimePicker value={value}  onValueChange={(date) => {setPlaceHolder(date),setTimeout(()=>setOpenDatePicker(false),handleInputChange(date),500)}} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
});
