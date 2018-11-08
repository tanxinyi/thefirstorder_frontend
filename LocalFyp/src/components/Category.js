import React, {Component} from 'react';
import {Tab, Container, Header, Tabs, ScrollableTab} from 'native-base';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
                <Text>CategoryID: {this.props.category.categoryId}</Text>
                <Text>CategoryName: {this.props.category.categoryName}</Text>
                <Text>CatImg: {this.props.category.catImg}</Text>
            </TouchableOpacity>
        );
    }
};

export default withNavigation(Category);