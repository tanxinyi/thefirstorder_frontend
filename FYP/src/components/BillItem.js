import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert, Dimensions
} from "react-native";
import {Card} from "react-native-elements";
import RF from "react-native-responsive-fontsize/index";

const BillItem = (props) => (

    <View style = {styles.container}>
        <View style = {styles.nameContainer}>
            <Text style = {styles.text}>{props.billItem.name}</Text>
        </View>
        <View style = {styles.quantityContainer}>
            <Text style = {styles.text}>x{props.billItem.customerOrderQuantity}</Text>
        </View>
        <View style = {styles.priceContainer}>
            <Text style = {styles.text}>${props.round2DP(props.billItem.customerOrderPrice * props.billItem.customerOrderQuantity)}</Text>
        </View>
    </View>
);

export default BillItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    nameContainer:{
        flex:2,

    },
    quantityContainer: {
        flex:1,
    },
    priceContainer:{
        flex:1,
    },
    text: {
        fontSize: RF(3),
        color: 'black',
    }
})