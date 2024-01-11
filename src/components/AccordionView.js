import React, {useEffect, useState,useContext, useMemo} from 'react';
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
  Platform,
  Alert
} from 'react-native';
import {LIGHT_BLUE, ORANGE_COLOR, THEME_COLOR, globalStyles, width} from '../utils/Style';
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
import { ParentContext } from '../wizardscreens/Step_1';
import VideoComponent from './VideoComponent'
import ImagePickerComponent from './ImagePickerComponent';
import ImagePicker from 'react-native-image-crop-picker';

const AccordionView = ({
  isSubChild,
  title,
  fields,
  expanded,
  handleAccordion,
  fieldIndex,
  mainIndex,
  setbackgroundColor
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
  const parentFunction = useContext(ParentContext);


  const wizobj = useSelector(state => state.global.wizardObj);

  useEffect(() => {
    setData();
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

  const handleTextInputChange = useMemo(() => (event, field) => {
    setSendData(prevData => ({ ...prevData, [field.name]: event }));
  }, []);

  const handleClickPhotoChange = useMemo(() => (photo,field) => {  
    // console.log("asdfghj =>",photo)
    setSendData((prevData) => {
      // Create a copy of the object
      const newObj = { ...prevData };
      // If the key exists in the object, push the photo to the array
      if (newObj[field.name]) {
        newObj[field.name].push(photo);
      } else {
        // If the key does not exist, create a new array with the photo
        if(photo == ""){
          newObj[field.name] = new Array();
        }
        else{
          newObj[field.name] = [photo];
        }
      }
      // Return the updated object
      return newObj;
    });
  },[]);

  const clearTempFiles = () => {
     ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    }).catch(e => {
      Alert.alert(e);
    });
  }

  const handleClickPhotoDelete = useMemo(()=>(photo,field) => {  
    
    setSendData((prevData) => {
      const newObj = { ...prevData };
      const newArray = newObj[field.name].filter((element) => element !== photo);
      newObj[field.name] = newArray;
      return newObj;
    });
  },[]);



  // console.log('is subfieds',isSubChild)
  // console.log('send data =>', send_data);
  // console.log('send data  length=>', send_data.engine_video != undefined ? send_data.engine_video.length:null);

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
            <CameraComponent   deletePhoto={handleClickPhotoDelete} fields={field} photoArray={handleClickPhotoChange} />
        );
      case 'video':
      return (
        <CameraComponent mediaType={'video'} deletePhoto={handleClickPhotoDelete} fields={field} photoArray={handleClickPhotoChange} />
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

  const image = <Image source={require('../assets/IMG_20230629_140254_867.jpg')} width={100} height={100} />;

  const showAlert = (message) => {
    Alert.alert(
      'Submitted Successfully !',
      message,
      [
        {
          text: 'OK',
          onPress: () => {},
          image,
        },
      ],
    );
  };


  const onSubmit = async () => {
    setToggle(true);
    try {
      // setSendData(prevData => ({...prevData, ['front_bumper']: clickedPhoto}));
      const res = await submitForm({data: send_data});
      console.log('res => ', res.data.data.message);

      if (res != undefined && res.data.data.code == 200) {
          parentFunction();
          

          
          // console.log("message +++",res.data.data.message)
          
        setError(prev => ({
          ...prev,
          success: res.data.data.message,
          error: '',
        }));
        if (isSubChild) {

          fields.map((item,ind)=>{
            if(item.type == 'file'){
              setSendData((prev)=>({...prev,[item.name]:[]}))
            }
          })
          setTimeout(() => {
            changeData();
          }, 1000);
        } else {
          // console.log("message ----------=>",isSubChild)
                    showAlert(res.data.data.message)

          let obj = {...wizobj};
          obj.currentStep = item[parseInt(obj.index) + 1].name.toLowerCase();
          obj.index = parseInt(obj.index) + 1;
          dispatch(setWizardCurrentStep(obj));
        }
        setbackgroundColor()
      } else if (res.error != '') {
        setError(prev => ({...prev, error: '**' + res.error}));
      } else {
        // console.log("ghjj")
        setError(prev => ({...prev, error: '**' + res.data.data.message}));
      }
    } catch {
    } finally {
      setToggle(false);
      clearTempFiles();
    }
  };
  // console.log("messgae  => ",error)

  return (
    <SafeAreaView
      style={[
        globalStyles.flexBoxJustify,
        {
          borderWidth: expanded ? 1 : 0,
          borderTopWidth: 0,
          borderColor: 'lightgrey',
          // paddingBottom:20
        },
      ]}>
      {/* <ImagePickerComponent /> */}
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
                  height: 40,
                  backgroundColor: ORANGE_COLOR,
                  borderRadius: 10,
                },
                globalStyles.flexBox,
              ]}
              onPress={onSubmit}
              activeOpacity={0.5}
              disabled={toggle}
              >
              
              {toggle ? (<View style={globalStyles.rowContainer}><DarkTextMedium style={{color:'#FFF'}} >Please wait...</DarkTextMedium>
                <ActivityIndicator size={'small'} color={'white'} />
                </View>
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
