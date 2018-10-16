// In App.js in a new project

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import axios from 'axios';
import MenuItem from './MenuItem';
import TagDetails from './TagDetails';

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

        const ip = '10.0.2.2'; //leave this here
        const request = 'http://' + ip + ':8080/api/foodItems/'
        //const request = 'http://' + ip + ':8080/ + /api/seatingTables/T001'
        //const request = 'https://fjchng-menuitems.herokuapp.com/api/getMenuItems'
        axios.get(request)
            .then(response => {
                this.setState({menuItems: response.data});
            }).catch(response => console.log('request link: ' + request + '              error: ' + response));



    };

    renderItems() {
        return this.state.menuItems.map(item => <MenuItem key={item.foodId} menuItem={item}/>);
    }


    render() {
        // require module

        return (

            <View>
                <Text> Cart is here!</Text>
                <Text>{this.params.name}</Text>
                <Text>{this.params.about}</Text>
                <Text> Quantity here? </Text>
                <Text>{this.params.quantity}</Text>
                {this.renderItems()}
            </View>
        );
    }
}
export default Cart;