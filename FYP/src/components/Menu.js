import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import axios from 'axios';
import MenuItem from './MenuItem';

class Menu extends Component {
    state = {menuItems: []};

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    componentWillMount() {
        // Returns a promise
        axios.get('')
            .then(response => this.setState({menuItems: response.data}));
    }

    renderItems() {
        return this.state.menuItems.map(item => <MenuItem key={item.foodId} menuItem={item}/>);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                {this.renderItems()}
                <Text>This will be the individual details of the menu item. TEST IF CAN SEE CHANGE </Text>
                <Button
                    title = "Click into item!!"
                    onPress={() =>
                        navigate('OrderItem'
                        )
                    }
                />
            </View>

        );
    }
}

export default Menu;