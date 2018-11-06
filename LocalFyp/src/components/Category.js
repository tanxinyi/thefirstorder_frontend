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

    componentWillMount(){
        const request = this.props.prefix + "api/menu/" + this.props.menuId + "/category/" + this.props.category.categoryId;
        console.log(request);
        axios.get(request)
            .then(response=>
                this.setState({foodPrice:response.data,
                    category: this.props.category,
                    prefix: this.props.prefix,
                    menuId: this.props.menuId,
                    orderId: this.props.orderId,
                    mounted: true
                }))
            .catch(error=> console.log(error));
    }

    render(){
        console.log("test5");
        if(this.state.mounted){
            console.log("test6");

            return (
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('FoodPrices', {
                        categoryId: this.state.category.categoryId,
                        menuId: this.state.menuId,
                        prefix: this.state.prefix,
                        addToCart: this.addToCart,
                        orderId: this.state.orderId,
                    })
                }}>
                    <Text>CategoryID: {this.props.category.categoryId}</Text>
                    <Text>CategoryName: {this.props.category.categoryName}</Text>
                    <Text>CatImg: {this.props.category.catImg}</Text>
                </TouchableOpacity>
            );
        }
        return(
            <Tab heading="Loading...">
                <Text>Loading...</Text>
            </Tab>
        )
    }
};

export default withNavigation(Category);