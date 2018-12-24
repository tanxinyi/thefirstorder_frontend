import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Header} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

class HomeMainPage extends React.Component{

    render(){

        return(
            <View>
                <Header style = {styles.header}>
                    <Text style = {styles.headerText}> MAKANOW!</Text>
                </Header>
                <View style = {styles.imageContainer}>
                    <LinearGradient colors={['#E8DBFC', '#F8F9D2']} style={styles.linearGradient}>
                        <Text  style = {styles.welcome}> Welcome! </Text>
                        <Image style={styles.logo}
                               source={require('../images/MakaNowLogo.png')}/>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000000',

    },
    headerText: {
        fontSize: 20,
        fontFamily:'Biko_Regular',
        top: '5%',
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

    welcome:{
        alignSelf: 'center',
        fontSize: 28,
        fontFamily: 'Biko_Regular',
        top: '150%',

    },
    linearGradient: {
        flex: 1,
        height:'100%',
        width:'100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
});

export default HomeMainPage;