import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
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
import {useSelector} from 'react-redux';
import InnerFlatlist from '../components/InnerFlatList';

const CustomContext = createContext();

const InnerFlatListContext = createContext();

export default function Final() {
  const profileDetails = useSelector(state => state.global.profileDetails);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [verticalKey, setVerticalKey] = useState(0);
  const api_send_data = useSelector(state => state.global.formData);

  // console.log("api data =>",api_send_data)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await documentsForm({
        leadId: profileDetails.id,
        type: 'final',
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

  if (loading) {
    return <ActivityIndicator size={'large'} color={THEME_COLOR} />;
  }
  const updateContextValue = index => {
    setSelectedIndex(index);
    setVerticalKey(prevKey => prevKey + 1);
  };
  const onSubmit = async () => {
    try {
      const data = await submitCarNumber('UK04AG3319');
      console.log('data =>', data);
    } catch (err) {
      console.log('error =>', err);
    }
  };

  return (
    <MainContainer style={{backgroundColor: 'transparent'}}>
      <CustomContext.Provider  value={{updateContextValue, selectedIndex}}>
        <HorizontalScrollView  data={data} />
        <VerticalScrollView
          key={selectedIndex}
          data={data}
          selectedIndex={selectedIndex}
        />
  
      </CustomContext.Provider>
    </MainContainer>
  );
}

const HorizontalScrollView = ({data}) => {
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
          style={styles.horizontalItem}>
          <DarkTextMedium style={styles.horizontalText}>
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
  // const { selectedIndex } = useContext(CustomContext);

  return (
    <View style={styles.verticalItem}>
      {/* <InnerFlatList item={data[selectedIndex]} /> */}
      <InnerFlatlist  item={data[selectedIndex]}/>
    </View>
  );
};

// const InnerFlatList = ({item}) => {


//   const updateFromValues = (val) =>{
//     console.log('inner flatList Val =>',val);
//   }

//   const renderComponent = item => {
//     switch (item.type) {
//       case 'text':
//         return <CustomTextInput onInputChange={() => {}} fields={item} />;
//       case 'dropdown':
//         return <CustomDropdown onInputChange={() => {}} fields={item} />;
//       case 'date':
//         return <DatePicker onInputChange={() => {}} fields={item} />;
//       case 'multipleselect':
//         return <MultiSelectDropdown onInputChange={() => {}} fields={item} />;
//       case 'file':
//         return <CameraComponent deletePhoto={() => {}} fields={item} />;
//       case 'video':
//         return <CameraComponent mediaType={'video'} fields={item} />;
//       case 'textarea':
//         return <CustomTextInput fields={item} isTextArea={true} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <InnerFlatListContext.Provider value={updateFromValues}>
//       <FlatList
//         style={{backgroundColor: 'transparent', height: height - 350}}
//         data={item.subfeilds}
//         keyExtractor={(innerItem, index) => index.toString()}
//         ListHeaderComponent={() => (
//           <View style={styles.innerHeader}>
//             <DarkTextLarge>{item.name}</DarkTextLarge>
//           </View>
//         )}
//         renderItem={({item, index}) => (
//           <View style={styles.innerItem}>{renderComponent(item)}</View>
//         )}
//       />
//     </InnerFlatListContext.Provider>
//   );
// };
// export { InnerFlatListContext ,InnerFlatList};



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
    backgroundColor: '',
    width: width,
    height: 50,
    ...globalStyles.flexBox,
  },
  innerItem: {
    backgroundColor: 'transparent',
  },
});


