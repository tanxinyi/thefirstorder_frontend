// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import RestaurantDetails from "./RestaurantDetails";
// Make a component
const FoodPrices = (props) => {
    return (
        <View>
            <Text>Food Availability: {props.FoodPrices.price}</Text>
            <Text>Food Availability: {props.FoodPrices.availability}</Text>
            <Text>Food Customisations: {props.FoodPrices.foodCustomisations}</Text>
            <Text>Food: {props.FoodPrices.food}</Text>

        </View>
    );
};

// Make component available to other parts of the app
export default FoodPrices;

