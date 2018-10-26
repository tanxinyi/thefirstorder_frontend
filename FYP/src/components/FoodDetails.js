// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import RestaurantDetails from "./RestaurantDetails";
// Make a component
const FoodDetails = (props) => {
    return (
        <View>
            <Text>Food Id: {props.FoodDetails.foodId}</Text>
            <Text>Food Name: {props.FoodDetails.name}</Text>
            <Text>Food Description: {props.FoodDetails.description}</Text>
            <Text>Food Category: {props.FoodDetails.category}</Text>
        </View>
    );
};

// Make component available to other parts of the app
export default FoodDetails;

