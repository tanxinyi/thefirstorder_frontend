import React, {Component} from 'react';
import {Button, View} from 'react-native';
import axios from 'axios';
import MenuItem from './MenuItem';

class Menu extends Component {
    state = {menuItems: []};

    componentWillMount() {
        // Returns a promise
        axios.get('')
            .then(response => this.setState({menuItems: response.data}));
    }

    renderItems() {
        return this.state.menuItems.map(item => <MenuItem key={item.itemName} menuItem={item}/>);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                {this.renderItems()}
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