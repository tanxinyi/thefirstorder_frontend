import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from "react-native";

const CartItem = (props) => (
    <View>
        <Text>Item Name: {props.cartItem.name}</Text>
        <Text>Quantity: {props.cartItem.customerOrderQuantity}</Text>
        {props.cartItem.customisationOptions.map((option) => (
            <Text key={option.customisationOptionId}>{option.name}</Text>
        ))}
        <Button
            title='X'
            onPress={()=> {
                Alert.alert(
                    'Remove Item',
                    'Remove ' + props.cartItem.name + ' from cart?',
                    [
                        {text: 'Yes', onPress: () => props.onPress(props.cartItem)},
                        {text: 'No', style:'cancel'}
                    ]
                )
            }}
        />
    </View>
);

export default CartItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})