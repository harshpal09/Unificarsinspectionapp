import { SafeAreaView, StyleSheet, Text, View,Image,TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { DarkTextLarge, DarkTextMedium, FadeTextMedium, ItemContainer, MainContainer,ProfileContainer } from '../components/StyledComponent'
import { THEME_COLOR, globalStyles, width } from '../utils/Style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch,useSelector } from 'react-redux'
import { isLoggedIn } from '../../redux/features/GlobalSlice'

const url = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F08%2F21%2F16%2F03%2Fhenry-cavill-2665842_960_720.jpg&tbnid=eWt1wBjIyk_fLM&vet=10CAIQxiAoAGoXChMIiMPW1M7UggMVAAAAAB0AAAAAEA8..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fphotos%2Fhenry-cavill-superman-actor-star-2665842%2F&docid=1MmtpgIum4jhyM&w=960&h=636&itg=1&q=henry%20cavill&ved=0CAIQxiAoAGoXChMIiMPW1M7UggMVAAAAAB0AAAAAEA8'
export default function AccountSection() {
  const dispatch = useDispatch();
  const isuserLoggedIn = useSelector((state)=> state.global.isUserLoggedIn)

  logoutConfirmation = () => {
    Alert.alert(
      'Logout',
      'Do you really want to Logout?',
      [{ text: "Not Now" },
      { text: "Logout", onPress: () => logout() }
      ],
      { cancelable: false }
    )
  }

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem('user_id').then(() => dispatch(toggleBoolean(false)))
      // console.log('global state in function on logout page is => ',boolstate);
      dispatch(isLoggedIn(!isuserLoggedIn))
    } catch {
      console.log("error in logged out")
    }
  }
  return (
    <MainContainer>
      <View style={{height:170,backgroundColor:THEME_COLOR,width:width+100,borderBottomLeftRadius:(width+150)/2,borderBottomRightRadius:(width+150)/2}}></View>
      <ProfileContainer style={[globalStyles.flexBox]}>
        <View style={[{width:'80%',padding:10,marginTop:-85},globalStyles.flexBoxAlign]}>
            <Image source={require('../assets/IMG_20230629_140254_867.jpg')} style={{width:130,height:130,borderRadius:130}} />
            <DarkTextLarge style={{padding:5}}>Harsh pal</DarkTextLarge>
            <FadeTextMedium style={{fontWeight:'500'}}>harshpal830@gmail.com</FadeTextMedium>
        </View>
        <View style={{width:'98%',borderBottomColor:'lightgrey',borderBottomWidth:1}}></View>
        <View style={[globalStyles.flexBox, { width: '100%', padding: 2 }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[globalStyles.profileHeadings]}
            onPress={() => {}}>
            <Text style={globalStyles.profileHeadingText}>Manage Profile</Text>
            <MaterialIcons
              name="navigate-next"
              color={'#6D6D6D'}
              size={25}
              style={globalStyles.profileIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={globalStyles.profileHeadings}
            onPress={() => {}}>
            <Text style={globalStyles.profileHeadingText}>
              Payment Details
            </Text>
            <MaterialIcons
              name="navigate-next"
              color={'#6D6D6D'}
              size={25}
              style={globalStyles.profileIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => {}}>
              <Text style={globalStyles.profileHeadingText}>Address</Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => openWebBrowser()}>
              <Text style={globalStyles.profileHeadingText}>
                Sell via UnifiCars
              </Text>
              <MaterialIcons
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
                style={globalStyles.profileIcons}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => {}}>
              <Text style={globalStyles.profileHeadingText}>Help & Support</Text>
              <MaterialIcons
                style={globalStyles.profileIcons}
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={globalStyles.profileHeadings}
              onPress={() => logoutConfirmation()}>
              <Text style={globalStyles.profileHeadingText}>Logout</Text>
              <MaterialIcons
                style={globalStyles.profileIcons}
                name="navigate-next"
                color={'#6D6D6D'}
                size={25}
              />
            </TouchableOpacity>
        </View>
      </ProfileContainer>
    </MainContainer>
  )
}

const styles = StyleSheet.create({})