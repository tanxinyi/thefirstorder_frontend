// In App.js in a new project

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import publicIP from 'react-native-public-ip';
import { NetworkInfo } from 'react-native-network-info';
import axios from 'axios';
import MenuItem from './MenuItem';



class Cart extends React.Component {
    static navigationOptions = {
        title: "Cart",
    };
    state = {
        menuItems: [],
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    componentWillMount() {
        // Returns a promise
        let console = {
            log: function(msg){
                alert(msg);
            }
        }

        const ip = '10.124.7.72'; //change this to your own IP address (from ipconfig)
        axios.get('https://' + ip + ':8080/api/table/Hello?hello=test')
            .then(response => {
                this.setState({menuItems: response.data});
            }).catch(response => console.log('error: ' + response));



    };

    renderItems() {
        return this.state.menuItems.map(item => <MenuItem key={item.itemName} menuItem={item}/>);
    }
    render() {
        // require module

        return (

            <View>
                <Text> Cart is here!</Text>
                <Text>{this.params.name}</Text>
                <Text>{this.params.about}</Text>
                <Text>{this.params.quantity}</Text>
                {this.renderItems()}
            </View>
        );
    }
}
export default Cart;