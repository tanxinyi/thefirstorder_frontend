// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
// Make a component
const RestaurantDetails = (props) => {
    return (
        <View>
            <Text>Restaurant ID: {props.restaurantDetails.restaurantId}</Text>
            <Text>Restaurant Name: {props.restaurantDetails.name}</Text>
            <Text>Restaurant Description: {props.restaurantDetails.description}</Text>
            <Text>Restaurant Contact Number: {props.restaurantDetails.contactNumber}</Text>
            <Text>Restaurant Street: {props.restaurantDetails.street}</Text>
            <Text>Restaurant Postal Code: {props.restaurantDetails.postalCode}</Text>
            <Text>Restaurant Cuisine: {props.restaurantDetails.cuisine}</Text>

        </View>
    );
};


// Make component available to other parts of the app
export default RestaurantDetails;

