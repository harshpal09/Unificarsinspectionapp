import React, { useEffect, useState, createContext } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { InspectionDetails, DetailsChild } from '../../export';
import { globalStyles } from '../utils/Style';
import { documentsForm } from '../services/Api';
import { useSelector } from 'react-redux';

const ParentContext = createContext();

export default function Step_1() {
  const wizobj = useSelector(state => state.global.wizardObj);
  const profileDetails = useSelector(state => state.global.profileDetails);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);

    getData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const getData = async () => {
    try {

      const response = await documentsForm({ leadId: profileDetails.id });
      if (response.data.data.code != undefined && response.data.data.code) {
        setData(response.data.data.data);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);

    }
  };

  return (
    <ParentContext.Provider value={getData}>
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        ) : (
          <FlatList
            style={{ paddingHorizontal: 10, paddingBottom: 20 }}
            ListHeaderComponent={() => <InspectionDetails />}
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={({ item, index }) => (
              <DetailsChild
                mainIndex={index}
                data={item[wizobj.currentStep]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </ParentContext.Provider>
  );
}

export { ParentContext };

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
