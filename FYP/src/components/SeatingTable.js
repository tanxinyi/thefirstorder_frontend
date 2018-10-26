// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import RestaurantDetails from "./RestaurantDetails";
// Make a component
const SeatingTable = (props) => {
    return (
        <View>
            <Text>Table QrCode: {props.SeatingTable.qrCode}</Text>
            <Text>Restaurant Name: {props.SeatingTable.restaurant}</Text>
            <Text>Table Capacity: {props.SeatingTable.capacity}</Text>
        </View>
    );
};

// Make component available to other parts of the app
export default SeatingTable;

