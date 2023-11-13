import { StyleSheet,Dimensions } from "react-native";

export const {width,height} = Dimensions.get('screen')

//Monochromatic colors: #1F51FF (base), #5077FF (lighter blue), #0D2E80 (darker blue)
//Split-complementary colors: #1F51FF (base), #FF1F6D (pink/red), #FF1F4E (pinkish-orange)
//Triadic colors: #1F51FF (base), #FF1F69 (pink/red), #69FF1F (green)
//Analogous colors: #1F51FF (base), #3E61FF (lighter blue), #FF691F (orange)
//Complementary color: #FF691F (orange)

export const THEME_COLOR = "#1F51FF"


export const globalStyles = StyleSheet.create({
    flexBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      flexBoxAlign: {
        // flex:1,
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
      },
      flexBoxJustify: {
        // flex:1,
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
      },
    
      mainContainer: {
        // flex:1,
        display: 'flex',
        // elevation:19,
        // padding:10,
        width: '100%',
    
        // height: '100%',
      },
      rowContainer: {
        display: 'flex',
        flexDirection: 'row',
      },
      columnContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      block: {
        width: 'auto',
        backgroundColor: 'green',
      },
      scrollViewContainer: {
        width: '100%',
        padding: 10,
        paddingBottom: 100,
        // backgroundColor:'green'
      },
      contentContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        //  height:300,
        marginVertical: 10,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    
        shadowColor: '#000', // Shadow color
        shadshowOffset: {width: 0, height: 2}, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity (0 to 1)
        shadowRadius: 4, //
      },
      shadow: {
        shadowColor: '#000', // Shadow color
        shadshowOffset: {width: 0, height: -20}, // Shadow offset
        shadowOpacity: 0.4, // Shadow opacity (0 to 1)
        shadowRadius: 8, //
      },
      childDetailContainer: {
        // backgroundColor: LIGHT_BLUE,
        width: '100%',
        height: 40,
        borderRadius: 10,
      },
})