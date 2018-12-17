import React, {Component} from 'react';
import {Tab, Container, Header, Tabs, ScrollableTab} from 'native-base';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import FoodPrice from './FoodPrice';
import { withNavigation } from "react-navigation";

class Category extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        console.log("test9: Category");
        console.log(JSON.stringify(this.props.category))
        return (
            <View>
                <View style = {styles.innerContainer}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('FoodPrices', {
                            category: this.props.category,
                            prefix: this.props.prefix,
                            qrCode: this.props.qrCode,
                            restaurantId: this.props.restaurantId,
                            menuId: this.props.menuId,
                            orderSummaryId: this.props.orderSummaryId,
                            cart: this.props.cart,
                            bill: this.props.bill,
                            orderId: this.props.orderId,
                            navigation:this.props.navigation,
                            categoryName: this.props.category.categoryName
                        })
                    }}>

                        <Image source={require("../images/MakaNowLogo.png")} style={styles.image} />
                        <View style = {styles.rightContainer}>
                            <Text style = {styles.categoryName}> {this.props.category.categoryName}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = {
    innerContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        height: '23%',
        zIndex: -1,
        paddingBottom: '10%',

    },
    image: {
        height: '100%',
        width: '35%',
        padding: '10%',
        top: 10,
    },
    rightContainer: {
        width: '65%',
        height: '100%',
        position: 'absolute',
        right: 0,
        padding: '5%',
        alignItems: 'center',
        backgroundColor: '#D8412F',


    },
    categoryName: {
        align: 'center',
        fontFamily: 'Biko_Regular',
        fontSize: 30,
        top:10,

    }
}



export default withNavigation(Category);