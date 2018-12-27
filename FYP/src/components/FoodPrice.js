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
        <Text>Food Name = {props.foodPrice.food.foodName}</Text>
        <Text>Food Description = {props.foodPrice.food.foodDescription}</Text>
        <Text>Food Price = {props.foodPrice.foodPrice}</Text>
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