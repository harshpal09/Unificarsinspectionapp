import React from 'react';
import styled from 'styled-components/native';

// Create a styled component
export const MainContainer = styled.SafeAreaView`
background-color: white;
  flex: 1; /* Take the full available space */
  align-items: center;
`;
export const Container = styled.View`
  background-color: white;
  align-items: center;
  padding:15px 5px 15px 5px;
  margin-bottom: 5px;
`;
export const FloatingButton = styled.TouchableOpacity`
  width: 80%;
  height:40px;
  background-color:#FF691F;
  position:absolute;
  border-radius:30px;
  bottom:10px;
`;

export const ItemContainer = styled.TouchableOpacity`
  width: 95%;
  background-color: white;
  margin: 0 auto; /* Center the container horizontally */
  margin-top: 10px; /* Add top margin if needed */
  padding: 5px; /* Add padding for content */
  border-radius: 8px; /* Add border-radius for rounded corners */
  border: 1px solid lightgrey; /* Add a 1px solid black border */
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
`;
export const FadeTextSmall = styled.Text`
  color: grey;
  font-size: 10px;
  font-weight: 700;
`;
export const FadeTextMedium = styled.Text`
  color: grey;
  font-size: 12px;
  font-weight: 700;
`;
export const DarkTextMedium = styled.Text`
  color: black;
  font-size: 12px;
  font-weight: 700;
`;
export const DarkTextSmall = styled.Text`
  color: black;
  font-size: 10px;
  font-weight: 700;
`;