import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MyComponent = ({ prop1, prop2 }) => {
  // Use useMemo to memoize the result of the expensive computation
  const memoizedValue = useMemo(() => {
    // Expensive computation based on props
    // console.log("chla")
    return prop1 + prop2;
  }, [prop1, prop2]); // Dependency array: recompute only when prop1 or prop2 changes

  return (
    <View>
      <Text>Memoized Value: {memoizedValue}</Text>
      <TouchableOpacity onPress={() => memoizedValue()}>
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyComponent;
