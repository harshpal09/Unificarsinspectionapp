import { SafeAreaView, StyleSheet, Text, View ,Image,Button, FlatList} from 'react-native'
import React, { useState } from 'react'
import { Container ,ItemContainer,FloatingButton,FadeTextMedium,DarkTextMedium,FadeTextSmall,DarkTextSmall} from '../components/StyledComponent'
import { globalStyles ,width,height,THEME_COLOR} from '../utils/Style';
import WizardProgressBar from '../components/WizardProgressBar';
import DetailsChild from '../components/DetailsChild';
import { useSelector } from 'react-redux';

export default function InspectionDetails({navigation}) {
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
  const [item,setItem] = useState([
    {
      name:'Documents',
      icon:'file'
    },
    {
      name:'Exterior',
      icon:'car-lifted-pickup'
    },
    {
      name:'Interior',
      icon:'car-seat-cooler'
    },
    {
      name:'Cooler',
      icon:'engine'
    },
    {
      name:'Other',
      icon:'car-cog'
    },
  ])
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']; // Add your steps here
  const profileDetails = useSelector((state)=> state.global.profileDetails)
  // console.log("profile details =>",profileDetails);
  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  return (
    <SafeAreaView>
      <Container>
      <ItemContainer
            activeOpacity={1}
            // onPress={()=> {navigation.navigate('InspectionDetails')}}
            style={[globalStyles.rowContainer]}>
            <View style={[{width: '45%', backgroundColor: 'transparent'}]}>
              <FadeTextSmall style={[{padding: 5}]}>
                {profileDetails.date}
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
                  <DarkTextMedium>{profileDetails.name}</DarkTextMedium>
                  <FadeTextMedium>{profileDetails.customer}</FadeTextMedium>
                </View>
              </View>
            </View>
            <View style={[{width: '45%', backgroundColor: 'transparent'}]}>
              <DarkTextSmall style={[{padding: 5}]}>
                Inspection Report
              </DarkTextSmall>
              {profileDetails.car_details.map((val,i)=>(
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
      </ItemContainer>
      </Container>
      <Container style={{height:100}} >
      <View style={[globalStyles.flexBox,]}>
        <WizardProgressBar navigation={navigation}  />
      </View>
      </Container>   
      {/* <FloatingButton style={[globalStyles.flexBox]} activeOpacity={0.93} onPress={()=> navigation.navigate('step_1') }>
        <Text style={{fontWeight:'800',fontSize:14,color:'white'}}>Start Inspection</Text>
      </FloatingButton> */}
      
 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})