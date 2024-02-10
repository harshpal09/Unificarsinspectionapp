import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
  TextInput,
} from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react';
import {
  DarkTextLarge,
  DarkTextMedium,
  MainContainer,
  StyledButton,
} from '../components/StyledComponent';
import {
  LIGHT_BLUE,
  LIGHT_BLUE_BACKGROUND,
  THEME_COLOR,
  globalStyles,
  height,
  width,
} from '../utils/Style';
import DatePicker from '../components/DatePicker';
import CustomDropdown from '../components/CustomDropdown';
import CustomTextInput from '../components/CustomTextInput';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import CameraComponent from '../components/CameraComponent';
import {FlatList} from 'react-native-gesture-handler';
import {documentsForm, submitCarNumber} from '../services/Api';
import {useDispatch, useSelector} from 'react-redux';
import { setFormData } from '../../redux/features/GlobalSlice';
import InnerFlatlist from '../components/InnerFlatList';

const CustomContext = createContext();

export default function Documents() {
  const profileDetails = useSelector(state => state.global.profileDetails);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [carNumber, setCarNumber] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [verticalKey, setVerticalKey] = useState(0);
  const [error, setError] = useState({
    error: '',
    success: '',
  });

  const api_send_data = useSelector(state => state.global.formData);

  // console.log("api data =>",api_send_data)

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    if(data.length > 0 && (api_send_data['form_type'] == undefined || api_send_data['form_type'] == '')){
      let obj = {...api_send_data};
      obj['form_type'] = data[selectedIndex].name;
      dispatch(setFormData(obj));
    }
  },[data]);

  const fetchData = async () => {
    try {
      const response = await documentsForm({
        leadId: profileDetails.id,
        type: 'document',
      });
      if (response.data.data.code) {
        setData(response.data.data.data);

      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("data ====>",data)

  if (loading) {
    return <ActivityIndicator size={'large'} color={THEME_COLOR} />;
  }
  const updateContextValue = index => {
    setSelectedIndex(index);
    setVerticalKey(prevKey => prevKey + 1);
  };
  const onSubmit = async () => {
    if (carNumber !== '') {
        try {
            setToggle(true);
            const resdata = await submitCarNumber(carNumber);
            // console.log("resdata =", resdata);
            let obj = {...api_send_data};
            if (resdata && resdata.result && resdata.result.status === "ACTIVE") {
                let originalData = [...data];
                let resultObject = {...resdata.result};

                let keyMappings = {
                    "manufacturing_date": "vehicleManufacturingMonthYear",
                    "registration_date": "regDate",
                    "rto": "regAuthority",
                    "ownership": "ownerCount",
                    "registration_number": "regNo",
                    "fitness_upto": "rcExpiryDate",
                    "varient": "model",
                    "insaurance_availibility": "vehicleInsuranceUpto"
                };

                originalData.forEach(field => {
                    field.subfeilds.forEach(subfield => {
                        let fieldName = subfield.name;
                        if (keyMappings.hasOwnProperty(fieldName)) {
                            let resultKey = keyMappings[fieldName];
                            subfield.value = resultObject[resultKey];
                            obj[fieldName] = resultObject[resultKey];
                        }
                    });
                });
                dispatch(setFormData(obj));
                setData(originalData);
                setVerticalKey(prev => prev+10);
                // console.log("new obj =>",obj);
                
                console.log("new api data =>",api_send_data);
            } else {
                setError(prev => ({ ...prev, error: resdata.result.message }));
            }
        } catch (err) {
            console.log('error =>', err);
        } finally {
            setToggle(false);
        }
    } else {
        setError(prev => ({ ...prev, error: "Please enter the Car Number first" }));
    }
};

  // console.log(carNumber);
  return (
    <MainContainer style={{backgroundColor: 'transparent'}}>
      <CustomContext.Provider value={{updateContextValue, selectedIndex}}>
        <View
          style={[
            {
              backgroundColor: 'transparent',
              width: width,
              paddingHorizontal: 5,
              paddingVertical: 10,
            },
            globalStyles.flexBox,
          ]}>
          <TextInput
            defaultValue={carNumber}
            placeholderTextColor={LIGHT_BLUE}
            onChangeText={t => setCarNumber(t)}
            placeholder="Search Car Number..."
            style={[
              {
                width: '90%',
                backgroundColor: 'transparent',
                borderRadius: 15,
                borderColor: THEME_COLOR,
                borderWidth: 1,
                paddingLeft: 15,
              },
            ]}
          />
          {(error.error != '' || error.success != '') && (
            <Text
              style={{
                fontSize: 13,
                color: error.error != '' ? 'red' : 'green',
                marginTop: 10,
              }}>
              {error.error == '' ? error.success : error.error}
            </Text>
          )}
          <StyledButton
            disabled={toggle}
            style={[globalStyles.flexBox]}
            onPress={onSubmit}>
            {toggle ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <DarkTextLarge style={{color: 'white'}}>Get Car Details</DarkTextLarge>
            )}
          </StyledButton>
        </View>
        <HorizontalScrollView 
          data={data} 
          selectedIndex={selectedIndex}
          />
        <VerticalScrollView
          key={verticalKey}
          data={data}
          selectedIndex={selectedIndex}
        />

      </CustomContext.Provider>
    </MainContainer>
  );
}

const HorizontalScrollView = ({data,selectedIndex}) => {
  const [scrollArray, setScrollArray] = useState([]);
  const {updateContextValue} = useContext(CustomContext); // Access the context and function to update value

  return (
    <FlatList
      style={{backgroundColor: 'transparent', height: 50}}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => updateContextValue(index)}
          // onLayout={e => onLayoutHandler(e, index)}
          style={{
            backgroundColor:selectedIndex == index ? THEME_COLOR:'white',
            padding: 10,
            height: 40,
            marginHorizontal: 5,
            marginVertical: 15,
            borderRadius: 15,
            borderColor:THEME_COLOR,
            borderWidth:1,
            ...globalStyles.flexBox,
          }}>
          <DarkTextMedium style={[{color:selectedIndex == index ? 'white':THEME_COLOR}]}>
            {item.name}
          </DarkTextMedium>
        </TouchableOpacity>
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const VerticalScrollView = ({data, selectedIndex}) => {
  return (
    <View style={styles.verticalItem}>
      <InnerFlatlist isDocument={true} item={data[selectedIndex]} />
    </View>
  );
};

// const InnerFlatList = ({item}) => {
//   return (
//     <FlatList
//       style={{backgroundColor: 'transparent', height: height - 510}}
//       data={item.subfeilds}
//       keyExtractor={(innerItem, index) => index.toString()}
//       ListHeaderComponent={() => (
//         <View style={styles.innerHeader}>
//           <DarkTextLarge>{item.name}</DarkTextLarge>
//         </View>
//       )}
//       renderItem={({item, index}) => (
//         <View style={styles.innerItem}>{renderComponent(item)}</View>
//       )}
//     />
//   );
// };

// const renderComponent = item => {
//   switch (item.type) {
//     case 'text':
//       return <CustomTextInput onInputChange={() => {}} fields={item} />;
//     case 'dropdown':
//       return <CustomDropdown onInputChange={() => {}} fields={item} />;
//     case 'date':
//       return <DatePicker onInputChange={() => {}} fields={item} />;
//     case 'multipleselect':
//       return <MultiSelectDropdown onInputChange={() => {}} fields={item} />;
//     case 'file':
//       return <CameraComponent deletePhoto={() => {}} fields={item} />;
//     case 'video':
//       return <CameraComponent mediaType={'video'} fields={item} />;
//     case 'textarea':
//       return <CustomTextInput fields={item} isTextArea={true} />;
//     default:
//       return null;
//   }
// };

const styles = StyleSheet.create({
  horizontalItem: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    height: 40,
    marginHorizontal: 5,
    marginVertical: 15,
    borderRadius: 15,
    ...globalStyles.flexBox,
  },
  horizontalText: {
    color: 'white',
  },
  verticalItem: {
    width: width,
    // height:height-200,
    backgroundColor: 'transparent',
  },
  verticalText: {
    color: 'black',
  },
  innerHeader: {
    backgroundColor: 'transparent',
    width: width,
    height: 50,
    ...globalStyles.flexBox,
  },
  innerItem: {
    // width:'100%',
    backgroundColor: 'transparent',
  },
});
