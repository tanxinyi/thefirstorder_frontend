'use strict';
import React, {Component} from 'react';
// depending on what you need, you import such components, like text.
import {Linking, View, Text, StyleSheet, Image, TextInput, Picker, TouchableOpacity} from 'react-native';
// stack navigator is for pages navigation
import { StackNavigator } from 'react-navigation';
// import different JS classes that are used
import MenuList from './src/components/MenuList';
import Menu from "./src/components/Menu";
import OrderItem from "./src/components/OrderItem";
import Cart from "./src/components/Cart";
import QRCodeScanner from "react-native-qrcode-scanner";

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: "MakaNow HomePage",
    };

    constructor(props){
        super(props);
        this.state={
            qrCode:'',
        }
        this.navigate = this.props.navigation.navigate;
    };

    render(){
        const { navigate } = this.props.navigation;

        return(
            /*
            <QRCodeScanner

                onRead={(e) =>
                    navigate('MenuList', {
                        qrCodeString : e.data
                    })
                }

                topContent={
                    <Text style={styles.centerText}>
                        Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
            */


            <View style={ {flex:1} }>

                <Image source={require('./src/images/qrcode.png')} style={styles.image} />
                <Text style = {styles.label}>Scan QR Code on the Table</Text>
                <Text style = {styles.label}>---------------------------------- OR ----------------------------------</Text>
                <Text style = {styles.label}>Enter the Table ID</Text>

                <TextInput
                    style = {styles.searchInput}
                    placeholder = 'i.e PbJ3i8'
                    name={"qrCode"}
                    id={"qrCode"}
                    value = {this.state.qrCode}
                    onChangeText= {(tableValue ) => this.setState({qrCode: tableValue})}>

                </TextInput>

                <TouchableOpacity onPress ={() =>
                    navigate('MenuList', {
                        qrCodeString: this.state.qrCode
                    })
                } >
                    <Text style = {styles.button}>
                        button name
                    </Text>

                </TouchableOpacity >

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
    }

});

const styles = StyleSheet.create({
    profile: {
        backgroundColor: 'blue' ,
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
        borderRadius: 5
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

})

