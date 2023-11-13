import { SafeAreaView, StyleSheet, Text, View,Animated,Easing, TouchableOpacity } from 'react-native'
import React ,{useRef,useEffect,useState} from 'react'

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {SubAccordionView,AccordionView} from '../../export'
import { THEME_COLOR,globalStyles } from '../utils/Style'
import { FloatingButton } from './StyledComponent'

export default function DetailsChild({item}) {
  // console.log("from details child=> ",data);
  const [toggle, setToggle] = useState(false);
  const [accordion, setAccordion] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [cheight,setCheight] = useState('');


  

  const spin = () => {
    // console.log('toggle=>',toggle);
    spinValue.setValue(1);
    Animated.timing(spinValue, {
      toValue: 2,
      duration: 300, // Adjust the duration to control the speed (e.g., 5000 milliseconds for 5 seconds)
      easing: Easing.linear, // You can experiment with different easing functions
      useNativeDriver: true,
    }).start(); // Restart the animation when it completes
  };
  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: toggle == true || toggle == undefined? ['0deg', '180deg']:['180deg', '0deg'], // Adjust the rotation range as needed
  });

 


  return (
    <SafeAreaView style={[globalStyles.flexBoxJustify,{width:"100%"}]}>
      <TouchableOpacity activeOpacity={0.7} style={[globalStyles.childDetailContainer,globalStyles.flexBoxJustify,{marginBottom:0,marginTop:10,borderBottomLeftRadius:accordion ? 0 : 10,borderBottomRightRadius:accordion ? 0 : 10,}]} onPress={()=> {spin(),setToggle(!toggle),setAccordion(!accordion)}} >
        <View style={[globalStyles.rowContainer,{justifyContent:'space-between',}]}>
          <View style={[globalStyles.rowContainer,{padding:10}]}>
            <MaterialCommunityIcons name={item.icon} size={15} style={{marginHorizontal:5}} color={THEME_COLOR}/>
            <Text style={{color:THEME_COLOR,fontWeight:'700'}}>{item.name}</Text>
          </View>
          <Animated.View style={[styles.rotatedBox, { padding:10,transform:[{ rotate: spinAnimation }]}]} >
              <MaterialCommunityIcons name='chevron-down' size={18} style={{marginHorizontal:8,}} color={THEME_COLOR}/>
          </Animated.View>
        </View>
      </TouchableOpacity>
    
      {/* {data.subpart.length ? 
        <SubAccordionView content={data.subpart} expanded={accordion}  /> 
      // <></>
      :
      <AccordionView  expanded={accordion} content={data.car_details} isSubAccordionView={data.subpart.length > 0} />
      // <></>
  } */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})