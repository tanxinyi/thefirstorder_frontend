import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from "react-native";

const BillItem = (props) => (
    <View>
        <Text>Item Name: {props.billItem.name}</Text>
        <Text>Quantity: {props.billItem.customerOrderQuantity}</Text>
        <Text>Price: $ {props.round2DP(props.billItem.customerOrderPrice * props.billItem.customerOrderQuantity)}</Text>
    </View>
);

export default BillItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})