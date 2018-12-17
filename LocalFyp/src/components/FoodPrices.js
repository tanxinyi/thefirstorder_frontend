import React, {Component} from 'react';
import {Card} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import FoodPrice from './FoodPrice';
import MenuHeader from "./MenuHeader";
import Category from "./Category";

class FoodPrices extends React.Component{

    constructor(props){
        super(props);
        this.state={
            mounted: false,
            foodPrices: [],
        }
        this.params = this.props.navigation.state.params;
    }

    componentWillMount(){
        console.log(JSON.stringify(this.params))
        const request = this.params.prefix + "api/menu/" + this.params.menuId + "/category/" + this.params.category.categoryId;
        console.log(request);
        axios.get(request)
            .then(response=> this.setState({foodPrices:response.data, mounted:true}))
            .catch(error=> console.log(error));
    }

    renderFoodPrices(){
        console.log("test12: FoodPrices renderFoodPrices");
        console.log(JSON.stringify(this.state.foodPrices));
        return this.state.foodPrices.map(
            (foodPrice,i) => <FoodPrice key={i}
                                        foodPrice={foodPrice}
                                        qrCode={this.props.qrCode}
                                        orderId={this.props.orderId}
                                        orderSummaryId={this.props.orderSummaryId}
                                        cart={this.props.cart}
                                        bill={this.props.bill}
                                        prefix={this.props.prefix}
                                        restaurantId={this.props.restaurantId}
                                        menuId={this.props.menuId}
                                        navigation={this.props.navigation}
            />);
    }

    render(){

        if(this.state.mounted) {
            console.log("test10: FoodPrices Mounted");
            return (
                <View>
                    <MenuHeader
                        navigation={this.props.navigation}
                        qrCode={this.props.qrCode}
                        orderId={this.props.orderId}
                        orderSummaryId={this.props.orderSummaryId}
                        cart={this.props.cart}
                        bill={this.props.bill}
                        prefix={this.props.prefix}
                        restaurantId={this.props.restaurantId}
                        menuId={this.props.menuId}
                        title={this.props.categoryName}
                    />
                    {this.renderFoodPrices()}
                </View>
            );
        }
        console.log("test11: FoodPrices Unmounted");
        return(
            <View>
                <Text>Loading FoodPrices...</Text>
            </View>
        )
    }

};

export default FoodPrices;