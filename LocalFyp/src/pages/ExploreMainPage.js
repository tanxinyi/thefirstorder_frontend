import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

class ExploreMainPage extends React.Component{
    render(){
        return(
            <View>
                <Text style={styles.temp}> Explore Main Page under construction! </Text>

            </View>
        );
    }
}


const styles = {
    temp: {

        fontFamily: 'Biko_Regular',
        fontSize: 20,
        alignSelf: 'center',
        top: '20%',

    },

    imageContainer:{
        width: '100%',
        height:  '100%',
        alignSelf: 'center',

    },
    logo: {
        resizeMode:"contain",
        width: '100%',
        height: '100%',
        alignSelf:'center',
        bottom:'15%',
    },
};

export default ExploreMainPage;
