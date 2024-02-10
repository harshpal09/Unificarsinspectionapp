import React, {useState,useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {THEME_COLOR, globalStyles, height, width} from '../utils/Style';
import {
  LightThemeColorTextMedium,
  ThemeColorTextMedium,
} from './StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../redux/features/GlobalSlice';
import { InnerFlatListContext } from './InnerFlatList';

const MultiSelectDropdown = ({fields,onInputChange}) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(fields.value != ""  ? fields.value.split(", ") :[]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const updateFromValues = useContext(InnerFlatListContext);

  const api_send_data = useSelector(state => state.global.formData);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Notify the parent component when the selection changes
    // onInputChange(selectedOptions.join(', '), fields);
    if(selectedOptions.length == 0) return;
    if(typeof updateFromValues == 'function'){
      updateFromValues(fields.type,selectedOptions.join(', '));
    }
  }, [selectedOptions]);

    // console.log("api send data =>",api_send_data)


  const handleSelect = item => {
    // Check if the item is already selected
    if (selectedOptions.includes(item)) {
      // If selected, remove it from the selectedOptions
      setSelectedOptions(prevSelected =>
        prevSelected.filter(selectedItem => selectedItem !== item),
      );
    } else {
      // If not selected, add it to the selectedOptions
      setSelectedOptions(prevSelected => [...prevSelected, item]);
      
    }

  };
  
  // console.log("selected options =>",selectedOptions.length)
  const filteredOptions = fields.elements.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={[styles.container, globalStyles.flexBox]}>
      {selectedOptions.length > 0 && (
        <View
          style={[
            {
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 10,
              width: '90%',
              justifyContent: 'flex-start',
            },
            globalStyles.wrapContainer,
            globalStyles.rowContainer,
          ]}>
          {selectedOptions.map((data, ind) => (
            <TouchableOpacity
              style={[
                {
                  borderWidth: 2,
                  backgroundColor: 'white',
                  borderColor: THEME_COLOR,
                  borderRadius: 10,
                  padding: 5,
                  marginHorizontal: 3,
                  marginVertical: 4,
                },
                globalStyles.rowContainer,
              ]}
              key={ind}>
              <ThemeColorTextMedium>{data}</ThemeColorTextMedium>
              <Entypo
                name="cross"
                color={THEME_COLOR}
                size={18}
                onPress={() => handleSelect(selectedOptions[ind])}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[
          styles.header,
          globalStyles.rowContainer,
          {justifyContent: 'space-between',borderColor:selectedOptions.length == 0 ? 'red':THEME_COLOR},
        ]}>
        <LightThemeColorTextMedium style={{color:selectedOptions.length == 0 ? 'red':THEME_COLOR}} >
          {selectedValue || fields.value ||fields.placeholder}{' '}
        </LightThemeColorTextMedium>
        <MaterialCommunityIcons
          name="chevron-down"
          color={selectedOptions.length == 0 ? 'red':THEME_COLOR}
          size={20}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          {/* <View style={{height: 200}}> */}
            <FlatList
              style={{flex:1}}
              data={filteredOptions}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedOptions.includes(item) && styles.selectedOption,
                  ]}
                  onPress={() => {handleSelect(item)}}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>
        // </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    position: 'relative',
  },
  header: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  dropdown: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#e6f7ff', // Change the background color for selected options
  },
});

export default MultiSelectDropdown;
