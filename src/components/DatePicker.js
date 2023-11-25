import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { LIGHT_BLUE, THEME_COLOR, globalStyles } from '../utils/Style';
import { LightThemeColorTextMedium } from './StyledComponent';

export default function DatePicker({title}) {
  const [value, setValue] = useState(dayjs());
  const [placeholder,setPlaceHolder] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handlePressOutside = () => {
    setOpenDatePicker(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={styles.container}>
        <View
          style={[
            globalStyles.flexBox,
            { backgroundColor: 'transparent', width: '100%', paddingVertical: 10 },
          ]}>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              padding: 10,
              borderRadius: 10,
              borderColor: THEME_COLOR,
              borderWidth: 1,
              fontWeight: '500',
            }}
            onPress={()=> setOpenDatePicker(!openDatePicker)}
            ><LightThemeColorTextMedium>{placeholder || title}</LightThemeColorTextMedium></TouchableOpacity>
        
        </View>
        {openDatePicker && (
          <DateTimePicker value={value}  onValueChange={(date) => {setPlaceHolder(date),setTimeout(()=>setOpenDatePicker(false),500)}} />
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
