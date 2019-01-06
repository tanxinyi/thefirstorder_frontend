import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert, Image,
    Dimensions,
} from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import RF from "react-native-responsive-fontsize/index";

const CartItem = (props) => (
    <Card containerStyle={{width: Dimensions.get('window').width}}>
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
                <Image source = {require('../images/explore.jpg')} style = {styles.logo}/>
            </View>
            <View style = {styles.itemDetailsContainer}>
                <Text style = {styles.itemName}>{props.cartItem.name}</Text>
                {props.cartItem.customisationOptions.map((option) => (
                    <Text style = {styles.itemCustomisation}key={option.customisationOptionId}>{option.name}</Text>
                ))}
            </View>
            <View style = {styles.itemCountContainer}>
                <Icon name='chevron-up' type='font-awesome' onPress={()=>{this.increaseCount()}} />
                <Text style = {styles.itemName}>{props.cartItem.customerOrderQuantity}</Text>
                <Icon name='chevron-down' type='font-awesome' onPress={()=>{this.decreaseCount()}} />
            </View>
            <View style = {styles.itemPriceContainer}>
                <Text style = {styles.price}> ${props.cartItem.customerOrderPrice} </Text>
            </View>
            <Icon
                style = {styles.delete}
                name='delete'
                type='AntDesign'
                raised={false}
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

    </Card>
);

export default CartItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    imageContainer:{
        flex: 1,
        height: 70,
        width: 140,
        backgroundColor: 'red',
    },

    itemDetailsContainer:{
        flex:1.8,
        alignItems:'center',
        justifyContent: 'center',

    },

    itemCountContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },

    itemPriceContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },

    logo:{
        flex:1 ,
        width: undefined,
        height: undefined
    },
    itemName: {
        fontSize: RF(2.5),
        color: 'black',
        textAlign: 'center',
    },

    itemCustomisation: {
        fontSize: RF(2),
    },

    delete:{
        alignSelf: 'flex-end',
        marginTop: -5,
    },
    price: {
        fontSize: RF(2.5),
        color: 'black',
        textAlign: 'center',
    }
})