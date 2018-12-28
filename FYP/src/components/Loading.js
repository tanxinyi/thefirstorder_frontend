import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from "react-native";

const Loading = (props) => (

    <View style = {styles.container}>
        <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage} >

        </ImageBackground>
    </View>

);

export default Component;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },

    backgroundImage: {
        flex:1,
        width: null,
        height: null,

    },
})