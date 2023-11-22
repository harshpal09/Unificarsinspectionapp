import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isLoggedIn, setProfileDetails} from '../../redux/features/GlobalSlice';
import {THEME_COLOR, globalStyles, height, width} from '../utils/Style';
import {
  DarkTextMedium,
  DarkTextSmall,
  FadeTextMedium,
  FadeTextSmall,
  FloatingButton,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function HomeScreen({navigation}) {
  const wizobj = useSelector(s => s.global.wizardObj);
  const dispatch = useDispatch();
  const [containerHeight, setContainerHeight] = useState(0);
  const [data, setData] = useState([
    {
      name: 'Harsh Pal',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
    {
      name: 'Shivam',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
    {
      name: 'shubham',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
    {
      name: 'Harsh Pal',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
    {
      name: 'Harsh Pal',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
    {
      name: 'Bhavesh Kapoor',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
    {
      name: 'Shivam singhal',
      customer: 'Seller',
      date: '9 Nov 2013 16:00',
      car_details: [
        {
          key: 'Lead/lot',
          value: '2344/201',
        },
        {
          key: 'Car',
          value: 'Toyota Avanza',
        },
        {
          key: 'No. POl',
          value: 'AX62472',
        },
        {
          key: 'Location',
          value: 'Delhi',
        },
      ],
    },
  ]);

  // console.log("wizard =>",wizobj)
  return (
    <MainContainer>
      <FlatList
        style={{flex:1}}
        data={data}
        renderItem={(item) => (
          <ItemContainer
            onPress={()=> {navigation.navigate('Step_1',{id : 4444}),dispatch(setProfileDetails(item.item)) }}
            style={[globalStyles.rowContainer]}>
            <View style={[{width: '45%', backgroundColor: 'transparent'}]}>
              <FadeTextSmall style={[{padding: 5}]}>
                {item.item.date}
              </FadeTextSmall>
              <View
                style={[
                  {width: '100%', backgroundColor: 'transparent'},
                  globalStyles.rowContainer,
                  globalStyles.flexBox,
                ]}>
                <Image
                  source={{
                    uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABQYHBAID/8QAMhAAAgIBAgMECQMFAAAAAAAAAAECAwQFEQYhURIxQYETIjJhcaGxwdEjUpEUQmJysv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A1IAGmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOHWdQjpmn2ZDSc16tcX4yfd+fID4azrmLpS7Mv1b2t41Rez834FXyOLdTsnvU6qY9Iw3+bIS62y+2dt03Oyb7UpPvbPBYiyYXGGbXJLLqrvh4uK7EvwW3Ts/G1GhXYtnaXdKL5OL6NGXHdo+o2aXmxvhu4d1kP3x6BWmg81zhbCNlclKEknFrxR6IAAAAAAAAAAAFQ48ul28Ojf1UpTa9/cvuW8pvHkGsnDs25OEo7/Br8gVYAGkAATVxoXCV0rtCoUnu63KHkny+TJkhODoOGhVtr25yl89vsTZAAAAAAAAAAAAheLMCWdpblVFytofpIpLm14r+OfkTQAyQF21nhWvJslfgTjTZJ7yrkvUb6rbu+hX7eGtXrlt/S9tdYWRa+paREn0x6bMi+FNMO3ZOXZjHqyWx+F9VtklOqFK/dZNfRbstWiaDj6UvSdr0uQ1s7Gtuz7kvACQwcaOHh040HvGqCjv1959wCAAAAAAAAAAAA+xwatquNpdHpL5bzl7Fcfak/x7yi6prebqUmrLPR0+FMHy8+vmBdsvX9MxG4zyozmv7al238uRHS4ywU9oY2TJdWor7lI5dAUq9VcY6fJpTqya/e4pr5MlcLVMHO5YuTXOX7N9pfw+ZmAXJprk13PoIla2Ch6NxPk4co1ZrlkUd279uK+Pj5l3xsinKojfj2KyuS3UkRX1AAAAAAAAOTU8+rTcOeTdzUeUY+Mn4I6yh8Y57ytS/poP9LG5fGfi/t5MCIzsy7Pyp5GRLtTl/CXRe45wCmgAKgAABK8P6xPSsr123i2PayHT/Je9EUCK1mE42QjODUoyW6a7mj0VrgrUHdiWYVj3lRzh/o/Dyf1RZSAAAAAA8XWKmmy2Xswi5P4LmZTOcrZysse85tyk+rZpWuy7Gi5sl3+hl9DMygACoAAAAAAAAleF8h4+uY735WN1y+DXL57GjGWadJw1DFkvC6H/AEjU2RQAEH//2Q==',
                  }}
                  style={{
                    width: (width - 10) / 2 / 5,
                    height: height / 25,
                    borderRadius: ((width - 10) / 2 / 5 + height / 25) / 2,
                  }}
                />
                <View style={[{width: '70%', padding: 10}]}>
                  <DarkTextMedium>{item.item.name}</DarkTextMedium>
                  <FadeTextMedium>{item.item.customer}</FadeTextMedium>
                </View>
              </View>
            </View>
            <View style={[{width: '45%', backgroundColor: 'transparent'}]}>
              <DarkTextSmall style={[{padding: 5}]}>
                Inspection Report
              </DarkTextSmall>
              {item.item.car_details.map((val,i)=>(
                <View
                style={[
                  {width: '100%', backgroundColor: 'transparent'},
                  globalStyles.rowContainer,
                  globalStyles.flexBox,
                ]}
                key={i}
                >
                <View
                  style={[
                    {width: '100%', backgroundColor: 'transparent'},
                    globalStyles.rowContainer,
                  ]}>
                  <FadeTextMedium style={{width: '50%', padding: 5}}>
                    {val.key}
                  </FadeTextMedium>
                  <DarkTextMedium style={{width: '50%', padding: 5}}>
                    {val.value}
                  </DarkTextMedium>
                </View>
              </View>
              ))}
              
            </View>
            <View
              style={[
                {width: '10%', backgroundColor: 'transparent'},
              ]}>
              <View
                style={[
                  {width: '100%',margin:-5,right:-10,height:150,backgroundColor: THEME_COLOR,borderRadius:7},
                  globalStyles.flexBox,
                ]}>
                <MaterialCommunityIcons
                  name={'phone'}
                  size={20}
                  color={'white'}
                />
              </View>
            </View>
          </ItemContainer>
        )}
      />
     

    </MainContainer>
  );
}

const styles = StyleSheet.create({});
