import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { InspectionDetails, DetailsChild } from '../../export';
import { globalStyles } from '../utils/Style';
import { documentsForm } from '../services/Api';
import { useSelector } from 'react-redux';

export default function Step_1() {
  const wizobj = useSelector((state) => state.global.wizardObj);
  const profileDetails = useSelector(state => state.global.profileDetails);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await documentsForm({ leadId: profileDetails.id });
      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log('datadfghjhgfdfghjhfdfghjhgfdfghj =>', response.data.data.data);
        setData(response.data.data.data);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      ) : (
        <FlatList
          style={{ paddingHorizontal: 10, paddingBottom: 20 }}
          ListHeaderComponent={() => <InspectionDetails />}
          data={data}
          renderItem={({ item,index }) =>
           <DetailsChild mainIndex={index} data={item[wizobj.currentStep]} />
            // console.log("2345678 ",item)
          }

          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
