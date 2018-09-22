// In App.js in a new project

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import axios from 'axios';
import MenuItem from './MenuItem';



class Cart extends React.Component {
    static navigationOptions = {
        title: "Cart",
    };
    state = {menuItems: []};

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    componentWillMount() {
        // Returns a promise
        axios.get('https://fjchng-menuItems.herokuapp.com/api/getMenuItems')
            .then(response => this.setState({menuItems: response.data}));
    }
    renderItems() {
        return this.state.menuItems.map(item => <MenuItem key={item.itemName} menuItem={item}/>);
    }
    render() {
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