import React from 'react';
import { SafeAreaView, Text, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const UseNet = () => {
  const [netInfo, setNetInfo] = React.useState(null);

  const myfunction = () => {
    if (netInfo === false) {
      Alert.alert(
        'No Internet!',
        'Your internet does not seem to work',
        [
          {
            text: 'Try again',
            onPress: () => {
              // Check internet connection again
              if (netInfo === false) {
                // Internet is still not connected, show alert again
                myfunction();
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView>
      <SetNetInfo setNetInfo={setNetInfo} />
      {netInfo === null || netInfo === true ? null : (
        Alert.alert(
          'No Internet!',
          'Your internet does not seem to work',
          [
            {
              text: 'Try again',
              onPress: () => myfunction(),
            },
          ],
          { cancelable: false }
        )
      )}
    </SafeAreaView>
  );
};

const SetNetInfo = ({ setNetInfo }) => {
  const netInfo = useNetInfo();

  React.useEffect(() => {
    setNetInfo(netInfo.isConnected);
  }, [netInfo]);

  return null;
};

export default UseNet;
