'use strict';
import React, {Component} from 'react';
// depending on what you need, you import such components, like text.
import {Linking, View, Text, StyleSheet, Image, TextInput, Picker, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
// import different JS classes that are used
import MenuList from './src/components/MenuList';
import Menu from "./src/components/Menu";
import OrderItem from "./src/components/OrderItem";
import Cart from "./src/components/Cart";
import ScanningPage from "./src/components/ScanningPage";
import BillingPage from "./src/components/BillingPage";
class HomeScreen extends React.Component {

    static navigationOptions = {
        title: "MakanNow Homepage",
    };



    render(){
        const { navigate } = this.props.navigation;

        return(

            <View style={ {flex:1, zIndex: -1} }>



                <TouchableOpacity onPress={()=>navigate('BillingPage')}>
                    <Image source={require('./src/images/qrcode.png')} style={styles.image}/>
                </TouchableOpacity>


                <Text  style = {styles.explore}> Scan QR HEREEEEEE </Text>
                <SearchBar
                    barTintColor="red"
                    tintColor="green"
                    textColor="black"
                    style = {styles.explore}
                    lightTheme
                    searchIcon={{ size: 24 }}
                    placeholder='Explore!'
                />
                <View style={styles.bottomContainer}>
                    <View style = {styles.innerContainer}>
                        <Image source={require('./src/images/location.jpg')} style={styles.innerImage}/>
                        <Text  style = {styles.innerText}> Location </Text>
                    </View>
                    <View style = {styles.innerContainer}>
                        <Image source={require('./src/images/food.jpg')} style={styles.innerImage}/>
                        <Text  style = {styles.innerText}> Cuisine </Text>
                    </View>
                    <View style = {styles.innerContainer}>
                        <Image source={require('./src/images/price.jpg')} style={styles.innerImage}/>
                        <Text  style = {styles.innerText}> Price </Text>
                    </View>
                </View>
            </View>


        )
    }
}

export default StackNavigator({
    Home: {
        screen: HomeScreen
    },

    MenuList: {
        screen: MenuList
    },

    Menu: {
        screen: Menu
    },

    OrderItem: {
        screen: OrderItem
    },

    Cart: {
        screen: Cart
    },

    ScanningPage: {
        screen: ScanningPage
    },

    BillingPage: {
        screen: BillingPage
    },


});

const styles = StyleSheet.create({
    profile: {
        backgroundColor: 'blue' ,
    },
    explore: {
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,

    },

    bottomContainer:{
        height: 410,

    },

    innerContainer:{
        height: '33.3%',
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 0.5,
        padding: 10,

    },

    innerImage:{
        height: '100%',
        width: '100%',
        opacity: 0.5,
    },

    innerText:{
        top: -90,
        fontSize: 50,
        fontWeight: 'bold',
        justifyContent: 'center',
        fontStyle:'italic',
        textAlign: 'center',
        fontFamily: 'serif',
        color: 'rgb(20, 24, 25)',

    },

    menu: {
        top:-10,
        width: 200,
        height: 150,
        alignItems: 'center',
    },

    button: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 300,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },

    searchInput:{

        top:10,
        bottom: 40,
        height: 40,
        width: 250,
        fontSize: 14,
        borderWidth:1,
        color:'black',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },

    label:{
        top:10,
        textAlign: 'center',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    /*
        buttonText:{
            fontSize: 18,
            color: 'white',
            alignSelf:'center'
        },
    */
    buttonStyle:{
        color: 'red',
        marginTop: 20,
        padding: 20,
        backgroundColor: 'green'
    },


    image:{
        width:100,
        height:100,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },



});

