// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
// Make a component
const MenuItem = (props) => {
    return (
        <View>
            <Text>This will be the individual details of the menu item.</Text>
            <Text>Item Name: {props.menuItem.itemName}</Text>
            <Text>Category: {props.menuItem.category}</Text>
            <Text></Text>
            <Text>Price: {props.menuItem.price}</Text>
        </View>
    );
};


// Make component available to other parts of the app
export default MenuItem;

