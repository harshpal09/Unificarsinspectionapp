import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {InspectionDetails} from '../../export'


export default function Step_1() {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <View>
      <InspectionDetails   />
      <Text>step_1</Text>
    </View>
  )
}

const styles = StyleSheet.create({})