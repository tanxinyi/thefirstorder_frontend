import React from 'react';
import {Button, View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MenuList from './src/components/MenuList';
import Menu from "./src/components/Menu";
import OrderItem from "./src/components/OrderItem";
import Cart from "./src/components/Cart";



class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "MakanNow HomePage",
    };

    constructor(props){
        super(props);
        this.state={
            qrCode:''
        }
        this.navigate = this.props.navigation.navigate;
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Image source={require('./src/images/qrcode.png')} style={styles.image} />
                <Text style = {styles.label}>Scan QR Code on the Table</Text>
                <Text style = {styles.label}>---------------------------------- OR ----------------------------------</Text>
                <Text style = {styles.label}>Enter the Table ID</Text>

                <TextInput
                    style = {styles.searchInput}
                    placeholder = 'i.e PbJ3i8'
                    name={"qrCode"}
                    id={"qrCode"}
                    onChangeText={(tableId) => this.setState({tableId})}
                />

                <Button
                    title = "enter"
                    onPress ={() =>
                        navigate('MenuList',{ qrCode: this.state.qrCode} )
                    }

                />

            </View>
        );
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

    buttonText:{
        fontSize: 18,
        color: 'white',
        alignSelf:'center'
    },

    button:{
        top:30,
        height:40,
        backgroundColor: '#48BBEC',
        borderColor:'#48BBEC',
        width:120,
        alignSelf:'center',
        justifyContent:'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
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
    }
});
