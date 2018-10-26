// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import RestaurantDetails from "./RestaurantDetails";
// Make a component
const MenuOverview = (props) => {
    return (
        <View>
            <Text>Menu Id: {props.MenuOverview.menuId}</Text>
            <Text>Restaurant: {props.MenuOverview.restaurant}</Text>
            <Text>Creation Date: {props.MenuOverview.dateOfCreation}</Text>
            <Text>Food Prices Details Date: {props.MenuOverview.foodPrices}</Text>


        </View>
    );
};

// Make component available to other parts of the app
export default MenuOverview;



