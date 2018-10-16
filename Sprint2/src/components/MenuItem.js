// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
// Make a component
const MenuItem = (props) => {
    return (
        <View>
            <Text>This will be the individual details of the menu item.</Text>
            <Text>Item Id: {props.menuItem.foodId}</Text>
            <Text>Name: {props.menuItem.name}</Text>
            <Text>Description: {props.menuItem.description}</Text>
            <Text>Category: {props.menuItem.category}</Text>
            <Text>Tags: {props.menuItem.tags}</Text>
        </View>
    );
};


// Make component available to other parts of the app
export default MenuItem;

