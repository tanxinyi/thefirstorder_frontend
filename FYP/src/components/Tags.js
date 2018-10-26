// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import RestaurantDetails from "./RestaurantDetails";
// Make a component
const Tags = (props) => {
    return (
        <View>
            <Text>Food Tag: {props.Tags.foodTagId}</Text>
            <Text>Tag Description: {props.Tags.description}</Text>
        </View>
    );
};

// Make component available to other parts of the app
export default Tags;

