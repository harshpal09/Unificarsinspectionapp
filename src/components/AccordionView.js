import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {LIGHT_BLUE, THEME_COLOR, globalStyles, width} from '../utils/Style';
import {
  CustomDropdown,
  CustomTextInput,
  DatePicker,
  MultiSelectDropdown,
} from '../../export';
import {Container, DarkTextMedium} from './StyledComponent';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import CameraComponent from './CameraComponent';
import {documentsForm, submitForm} from '../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getStateFromPath} from '@react-navigation/native';
import {setWizardCurrentStep} from '../../redux/features/GlobalSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AccordionView = ({
  isSubChild,
  title,
  fields,
  expanded,
  handleAccordion,
  fieldIndex,
  mainIndex,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [send_data, setSendData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [field_data, setFieldData] = useState(fields);
  const [clickedPhoto,setClickedPhotos]= useState([])
  const [error, setError] = useState({
    error: '',
    success: '',
  });
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
      name: 'Final',
      icon: 'car-cog',
    },
  ]);

  const dispatch = useDispatch();
  const wizobj = useSelector(state => state.global.wizardObj);
  // console.log("wizard obj =>",wizobj);
  useEffect(() => {
    setData();
    // changeData();
  }, []);

  const setData = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('user');
      let user = JSON.parse(userInfo);
      setSendData(prevData => ({
        ...prevData,
        user_id: JSON.parse(user).id,
        lead_id: profileDetails.id,
        form_type: title,
        // ['rc_image']:'dfghjk' // Set the form_type value
      }));
    } catch (error) {
      console.log('error - ', error);
      setError(prev => ({
        ...prev,
        error: '**Something went wrong to save user data',
      }));
    }
  };

  const profileDetails = useSelector(state => state.global.profileDetails);

  const handleTextInputChange = (event, field) => {

    setSendData(prevData => ({...prevData, [field.name]: event}));
  };

  const handleClickPhotoChange = (photo) => {
    
    // let arr = [...clickedPhoto];
    // arr.map((item,ind)=>{
    //   const formData = new FormData();
    //   formData.append('file', {
    //     uri: item.path,
    //     type: 'image/jpeg',
    //     name: 'photo_'+ind.toString()+'.jpg',
    //   });

    // })

    // console.log("form data =>",formData);
    

    setClickedPhotos(prevData => [...prevData, photo]);
  };

  // console.log('profile =>',title)
  // console.log('send data =>', send_data);
  // console.log('photo image =>',clickedPhoto.length > 0 ?  clickedPhoto[0]._parts:null)
  // const toggleModal = (image, text) => {
  //   setSelectedImage(image);
  //   setSelectedText(text);
  //   setModalVisible(!isModalVisible);
  // };

  const changeData = async () => {
    try {
      setLoading(true);
      const response = await documentsForm({leadId: profileDetails.id});
      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log('main index =>',fieldIndex)
        // console.log('datadfghjhgfdfghjhfdfghjhgfdfghj =>', response.data.data.data[0]['exterior'][mainIndex].feilds[fieldIndex].subfeilds);
        // setFieldData(response.data.data.data);
        // console.log("agya =>",response.data.data.data[0][wizobj.currentStep][mainIndex].feilds[fieldIndex].subfeilds)
        setFieldData(
          response.data.data.data[0][wizobj.currentStep][mainIndex].feilds[
            fieldIndex
          ].subfeilds,
        );
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("flismdshdbs data => ",field_data)

  const renderField = field => {
    switch (field.type) {
      case 'text':
        return (
          <CustomTextInput
            onInputChange={handleTextInputChange}
            fields={field}
          />
        );
      case 'dropdown':
        return (
          <CustomDropdown
            onInputChange={handleTextInputChange}
            fields={field}
          />
        );
      case 'date':
        return (
          <DatePicker onInputChange={handleTextInputChange} fields={field} />
        );
      case 'multipleselect':
        return (
          <MultiSelectDropdown
            onInputChange={handleTextInputChange}
            fields={field}
          />
        );
      case 'file':
        return (
          <CameraComponent fields={field} photoArray={handleClickPhotoChange} />
        );
      case 'textarea':
        return (
          <CustomTextInput
            onInputChange={handleTextInputChange}
            fields={field}
            isTextArea={true}
          />
        );
      // Add more cases for other types
      default:
        return null;
    }
  };


  const onSubmit = async () => {
    setToggle(true);
    try {
      setSendData(prevData => ({...prevData, ['front_bumper']: clickedPhoto}));
      const res = await submitForm({data: send_data});
      console.log('res => ', res.data.data);

      if (res != null && res.data.data.code == 200) {
        setError(prev => ({
          ...prev,
          success: res.data.data.message,
          error: '',
        }));
        if (isSubChild) {
          setTimeout(() => {
            handleAccordion(!expanded), changeData();
          }, 1000);
        } else {
          let obj = {...wizobj};
          obj.currentStep = item[parseInt(obj.index) + 1].name.toLowerCase();
          obj.index = parseInt(obj.index) + 1;
          dispatch(setWizardCurrentStep(obj));
        }
      } else if (res.error != '') {
        setError(prev => ({...prev, error: '**' + res.error}));
      } else {
        // console.log("ghjj")
        setError(prev => ({...prev, error: '**' + res.data.data.message}));
      }
    } catch {
    } finally {
      setToggle(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.flexBoxJustify,
        {
          borderWidth: expanded ? 1 : 0,
          borderTopWidth: 0,
          borderColor: 'lightgrey',
        },
      ]}>
      {expanded && (
        <Container>
          {field_data.map((field, index) => (
            <React.Fragment key={index}>{renderField(field)}</React.Fragment>
          ))}
          
          
          {(error.error != '' || error.success != '') && (
            <Text
              style={{
                fontSize: 13,
                color: error.error != '' ? 'red' : 'green',
              }}>
              {error.error == '' ? error.success : error.error}
            </Text>
          )}
          <View style={[{paddingTop: 10, width: '90%'}]}>
            <TouchableOpacity
              style={[
                {
                  width: '100%',
                  // padding:10,
                  height: 30,
                  backgroundColor: THEME_COLOR,
                  borderRadius: 10,
                },
                globalStyles.flexBox,
              ]}
              onPress={onSubmit}
              activeOpacity={0.9}>
              {toggle ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <DarkTextMedium style={{color: 'white'}}>Submit</DarkTextMedium>
              )}
            </TouchableOpacity>
          </View>
        </Container>
      )}
    </SafeAreaView>
  );
};


export default AccordionView;
