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
            mounted: false,
            foodPrices: [],
            category: {},
            menuId: '',
            prefix: '',
            orderId: ''
        }
    }

    render(){
        console.log("test9: Category");
        console.log(JSON.stringify(this.props.category))
        return (
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('FoodPrices', {
                    category: this.props.category,
                    menuId: this.props.menuId,
                    prefix: this.props.prefix,
                    addToCart: this.props.addToCart,
                    orderId: this.props.orderId,
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