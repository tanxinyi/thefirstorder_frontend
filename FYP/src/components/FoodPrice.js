import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const FoodPrice = (props) => (
    <TouchableOpacity
        onPress={()=> props.navigation.navigate('FoodCustomisation',{
            foodPrice: props.foodPrice,
            prefix: props.prefix,
            menu:props.menu,
            seatingTable:props.seatingTable,
            restaurant:props.restaurant,
        })}>
        <Text>Food Name = {props.foodPrice.food.name}</Text>
        <Text>Food Description = {props.foodPrice.food.description}</Text>
        <Text>Food Price = {props.foodPrice.price}</Text>
        <Text>{props.foodPrice.availability ? '' : 'Sold Out'}</Text>
    </TouchableOpacity>
);

export default FoodPrice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})